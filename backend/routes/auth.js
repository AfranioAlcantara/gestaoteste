const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const localStore = require('../store');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'super-secret-key';
const useLocalStore = process.env.USE_LOCAL_STORE === 'true';

router.post('/register', async (req, res) => {
  const { name, email, password, role, manager_id } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const existing = useLocalStore
      ? await localStore.getUserByEmail(email)
      : await db.query('SELECT id FROM users WHERE email = $1', [email]);

    if ((useLocalStore && existing) || (!useLocalStore && existing.rows.length)) {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = useLocalStore
      ? await localStore.createUser({
          name,
          email,
          password_hash,
          role: role || 'employee',
          manager_id: manager_id || null,
          vacation_balance: 30,
        })
      : (await db.query(
          'INSERT INTO users (name, email, password_hash, role, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, manager_id, vacation_balance',
          [name, email, password_hash, role || 'employee', manager_id || null]
        )).rows[0];

    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '8h' });

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = useLocalStore
      ? await localStore.getUserByEmail(email)
      : (await db.query('SELECT id, name, email, password_hash, role, manager_id, vacation_balance FROM users WHERE email = $1', [email])).rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '8h' });
    delete user.password_hash;

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;
