const express = require('express');
const db = require('../db');
const localStore = require('../store');
const auth = require('../middleware/auth');

const router = express.Router();
const useLocalStore = process.env.USE_LOCAL_STORE === 'true';

router.use(auth);

router.get('/', async (req, res) => {
  try {
    let requests = [];

    if (useLocalStore) {
      requests = req.user.role === 'manager'
        ? await localStore.getAllVacationRequests()
        : await localStore.getVacationRequestsForUser(req.user.userId);

      requests = await Promise.all(requests.map(async (request) => {
        const user = await localStore.getUserById(request.user_id);
        return {
          ...request,
          user_name: user ? user.name : 'Usuário',
        };
      }));
    } else {
      let query = `SELECT vr.id, vr.user_id, u.name AS user_name, vr.start_date, vr.end_date, vr.total_days, vr.status, vr.manager_comment, vr.created_at
                   FROM vacation_requests vr
                   JOIN users u ON u.id = vr.user_id`;
      let params = [];

      if (req.user.role !== 'manager') {
        query += ' WHERE vr.user_id = $1';
        params = [req.user.userId];
      }

      query += ' ORDER BY vr.created_at DESC';
      const result = await db.query(query, params);
      requests = result.rows;
    }

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar solicitações de férias.' });
  }
});

router.post('/', async (req, res) => {
  const { start_date, end_date, total_days } = req.body;

  if (!start_date || !end_date || !total_days) {
    return res.status(400).json({ error: 'Data de início, data de fim e total de dias são obrigatórios.' });
  }

  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ error: 'A data de término deve ser igual ou posterior à data de início.' });
  }

  try {
    const user = useLocalStore
      ? await localStore.getUserById(req.user.userId)
      : (await db.query('SELECT vacation_balance FROM users WHERE id = $1', [req.user.userId])).rows[0];

    const balance = user?.vacation_balance || 0;

    if (total_days > balance) {
      return res.status(400).json({ error: `Saldo insuficiente. Você possui apenas ${balance} dias disponíveis.` });
    }

    const result = useLocalStore
      ? await localStore.createVacationRequest({ user_id: req.user.userId, start_date, end_date, total_days })
      : (await db.query(
          'INSERT INTO vacation_requests (user_id, start_date, end_date, total_days) VALUES ($1, $2, $3, $4) RETURNING id, user_id, start_date, end_date, total_days, status, manager_comment, created_at',
          [req.user.userId, start_date, end_date, total_days]
        )).rows[0];

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar solicitação de férias.' });
  }
});

router.put('/:id/decision', async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ error: 'Aprovação somente para gestores.' });
  }

  const { id } = req.params;
  const { action, manager_comment } = req.body;
  const allowed = ['approved', 'rejected', 'cancelled'];

  if (!allowed.includes(action)) {
    return res.status(400).json({ error: 'Ação inválida. Use approved, rejected ou cancelled.' });
  }

  try {
    const request = useLocalStore
      ? await localStore.getVacationRequestById(id)
      : (await db.query('SELECT user_id, total_days, status FROM vacation_requests WHERE id = $1 FOR UPDATE', [id])).rows[0];

    if (!request) {
      return res.status(404).json({ error: 'Solicitação não encontrada.' });
    }

    if (request.user_id === req.user.userId) {
      return res.status(403).json({ error: 'Gestores não podem aprovar suas próprias solicitações.' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Apenas solicitações pendentes podem ser alteradas.' });
    }

    if (useLocalStore) {
      await localStore.updateVacationRequest(id, {
        status: action,
        manager_comment: manager_comment || null,
      });

      if (action === 'approved') {
        await localStore.updateUserBalance(request.user_id, -request.total_days);
      }
    } else {
      const client = await db.pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(
          'UPDATE vacation_requests SET status = $1, manager_comment = $2 WHERE id = $3',
          [action, manager_comment || null, id]
        );

        if (action === 'approved') {
          await client.query(
            'UPDATE users SET vacation_balance = vacation_balance - $1 WHERE id = $2',
            [request.total_days, request.user_id]
          );
        }

        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }

    res.json({ id: Number(id), status: action, manager_comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status da solicitação.' });
  }
});

module.exports = router;
