// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Login.css';

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
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        <h2>Login</h2>
        {error && <div className="login-error">{error}</div>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <div className="login-password-row">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-pass-btn"
            onClick={() => setShowPass(v => !v)}
            tabIndex={-1}
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
        <label>Captcha: <span className="captcha-question">{captcha.question}</span></label>
        <input
          type="text"
          placeholder="Answer"
          value={captchaInput}
          onChange={e => setCaptchaInput(e.target.value)}
          required
        />
        <button type="submit" className="login-submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
