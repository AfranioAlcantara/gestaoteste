import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  function getEmailValidationMessage(value) {
    if (!value) return 'Email é obrigatório.';
    if (!value.includes('@')) return 'Email inválido: falta o @.';
    if (!value.includes('.com')) return 'Email inválido: falta o ponto final .com.';
    return '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message = getEmailValidationMessage(email);
    if (message) {
      setEmailError(message);
      return;
    }
    onLogin({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError('');
          }}
          onInvalid={(event) => {
            event.preventDefault();
            const message = getEmailValidationMessage(event.target.value);
            event.target.setCustomValidity(message);
            setEmailError(message);
          }}
          onInput={(event) => {
            event.target.setCustomValidity('');
          }}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900"
          required
        />
        {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Senha</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900"
          required
        />
      </label>
      <button type="submit" className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800">
        Entrar
      </button>
    </form>
  );
}
