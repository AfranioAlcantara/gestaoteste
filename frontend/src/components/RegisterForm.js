import { useState } from 'react';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const passwordsMismatch = password && confirmPassword && password !== confirmPassword;

  function getEmptyFieldMessage(field) {
    switch (field) {
      case 'name':
        return 'Campo nome não pode estar vazio!';
      case 'email':
        return 'Campo email nao pode estar vazio!';
      case 'password':
        return 'Campo senha nao pode estar vazio!';
      case 'confirmPassword':
        return 'Campo confirmar senha nao pode estar vazio!';
      default:
        return '';
    }
  }

  function getEmailValidationMessage(value) {
    if (!value) return getEmptyFieldMessage('email');
    if (!value.includes('@')) return 'Email inválido: falta o @.';
    if (!value.includes('.com')) return 'Email inválido: falta o ponto final .com.';
    return '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nameMessage = getEmptyFieldMessage('name');
    const emailMessage = getEmailValidationMessage(email);
    const passwordMessage = password ? '' : getEmptyFieldMessage('password');
    const confirmMessage = confirmPassword ? '' : getEmptyFieldMessage('confirmPassword');

    setNameError(nameMessage && !name ? nameMessage : '');
    setEmailError(emailMessage);
    setPasswordError(passwordMessage);
    setConfirmPasswordError(confirmMessage);

    if (nameMessage && !name) return;
    if (emailMessage) return;
    if (passwordMessage) return;
    if (confirmMessage) return;
    if (passwordsMismatch) {
      setConfirmPasswordError('As senhas não coincidem.');
      return;
    }

    onRegister({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Nome</span>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError('');
          }}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900"
          required
        />
        {nameError && <p className="mt-2 text-sm text-red-600">{nameError}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError('');
          }}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-900"
          required
        />
        {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Senha</span>
        <div className="relative mt-2">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError('');
            }}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 outline-none focus:border-slate-900"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Confirmar senha</span>
        <div className="relative mt-2">
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setConfirmPasswordError('');
            }}
            onInvalid={(event) => {
              event.preventDefault();
              const message = getEmptyFieldMessage('confirmPassword');
              event.target.setCustomValidity(message);
              setConfirmPasswordError(message);
            }}
            onInput={(event) => {
              event.target.setCustomValidity('');
            }}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 outline-none focus:border-slate-900"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-200"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {confirmPasswordError && <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>}
      </label>

      {passwordsMismatch && (
        <p className="text-sm text-red-600">As senhas não coincidem.</p>
      )}

      <button
        type="submit"
        disabled={passwordsMismatch}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Cadastrar
      </button>
    </form>
  );
}
