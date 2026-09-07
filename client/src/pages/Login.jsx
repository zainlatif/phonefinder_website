// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import { Eye, EyeOff } from 'lucide-react';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: (a + b).toString() };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (captchaInput !== captcha.answer) {
      setError('Captcha answer is incorrect.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    try {
      const res = await axios.post(getApiUrl('/api/users/login'), {
        email,
        password
      });
      login(res.data);
      navigate('/');
    } catch {
      setError('Invalid credentials');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(44,62,80,0.1)] sm:p-8" onSubmit={handleLogin} autoComplete="off">
        <div className="mb-2 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">PhoneFinder account</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to PhoneFinder.</p>
        </div>
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-sm font-medium text-red-700" role="alert">{error}</div>}
        <label className="text-sm font-semibold text-slate-700" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          required
        />
        <label className="text-sm font-semibold text-slate-700" htmlFor="login-password">Password</label>
        <div className="relative">
          <input
            id="login-password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-11 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            onClick={() => setShowPass(v => !v)}
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="login-captcha">Captcha: <span className="ml-1 font-bold text-orange-600">{captcha.question}</span></label>
        <input
          id="login-captcha"
          type="text"
          placeholder="Answer"
          value={captchaInput}
          onChange={e => setCaptchaInput(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          required
        />
        <button type="submit" className="mt-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
