import { useEffect, useState } from 'react';
import api from './services/api';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import VacationRequestForm from './components/VacationRequestForm';
import VacationList from './components/VacationList';

function App() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      fetchRequests();
    }
  }, []);

  async function fetchRequests() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/vacations');
      setRequests(response.data);
    } catch (err) {
      setError('Falha ao carregar solicitações.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(data) {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      fetchRequests();
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  }

  async function handleRegister(data) {
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      fetchRequests();
    } catch (err) {
      setError('Cadastro falhou. Verifique os dados e tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setRequests([]);
  }

  async function handleSubmitRequest(payload) {
    try {
      await api.post('/vacations', payload);
      await fetchRequests();
    } catch (err) {
      setError('Erro ao enviar solicitação de férias.');
    }
  }

  async function handleDecision(id, action) {
    try {
      await api.put(`/vacations/${id}/decision`, {
        action,
        manager_comment: action === 'approved' ? 'Aprovado pelo gestor.' : 'Rejeitado pelo gestor.',
      });
      await fetchRequests();
    } catch (err) {
      setError('Erro ao atualizar o status da solicitação.');
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand text-slate-900 px-4 py-8">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-300 bg-white/90 p-8 shadow-lg shadow-slate-200">
          <h1 className="text-3xl font-semibold text-slate-900">Gestão de Férias</h1>
          <p className="mt-2 text-sm text-slate-600">Acesse sua conta ou crie um novo usuário.</p>

          <div className="mt-6 flex items-center gap-2 rounded-3xl bg-slate-100 p-2">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === 'login' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === 'register' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cadastro
            </button>
          </div>

          {activeTab === 'login' && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">Acesso rápido de teste</p>
              <div className="mt-3 space-y-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold">Gestor</p>
                  <p className="text-slate-600">Email: <span className="font-medium">testegestor@example.com</span></p>
                  <p className="text-slate-600">Senha: <span className="font-medium">teste@123</span></p>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold">Funcionário</p>
                  <p className="text-slate-600">Email: <span className="font-medium">testefuncionario@example.com</span></p>
                  <p className="text-slate-600">Senha: <span className="font-medium">teste@123</span></p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'login' ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleRegister} />}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-300 bg-white/90 p-8 shadow-lg shadow-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Olá, {user.name}</h1>
            <p className="mt-1 text-sm text-slate-600">Função: {user.role === 'manager' ? 'Gestor' : 'Funcionário'}</p>
          </div>
          <button onClick={handleLogout} className="rounded-full bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800">
            Sair
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {user.role !== 'manager' && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">Novo pedido de férias</h2>
              <VacationRequestForm onSubmit={handleSubmitRequest} />
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Solicitações</h2>
              <button onClick={fetchRequests} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800">
                Atualizar
              </button>
            </div>
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            <VacationList requests={requests} loading={loading} userRole={user.role} onDecision={handleDecision} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
