// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!accepted) {
      setError('You must accept the Privacy Policy.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post(getApiUrl('/api/users/signup'), { email, password });
      navigate('/login');
    } catch {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(44,62,80,0.1)] sm:p-8" onSubmit={handleSignup} autoComplete="off">
        <div className="mb-2 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">PhoneFinder account</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-500">Save favorites and explore phones faster.</p>
        </div>
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-sm font-medium text-red-700" role="alert">{error}</div>}
        <label className="text-sm font-semibold text-slate-700" htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          required
        />
        <label className="text-sm font-semibold text-slate-700" htmlFor="signup-password">New Password</label>
        <div className="relative">
          <input
            id="signup-password"
            type={showPass ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            autoComplete="new-password"
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
        <label className="text-sm font-semibold text-slate-700" htmlFor="signup-confirm-password">Confirm Password</label>
        <div className="relative">
          <input
            id="signup-confirm-password"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            autoComplete="new-password"
            onChange={e => setConfirm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-11 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            onClick={() => setShowConfirm(v => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        <div className="mt-2 flex items-start gap-2">
          <input
            type="checkbox"
            id="privacy"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            className="mt-1 size-4 accent-orange-600"
            required
          />
          <label htmlFor="privacy" className="text-sm leading-5 text-slate-600">
            I accept the <a className="font-semibold text-orange-600 underline decoration-orange-200 underline-offset-2 hover:text-orange-700" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and Terms of Service.
          </label>
        </div>
        <button type="submit" className="mt-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
