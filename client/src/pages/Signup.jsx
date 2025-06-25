// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

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
      await axios.post('http://localhost:5000/api/users/signup', { email, password });
      navigate('/login');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup} autoComplete="off">
        <h2>Signup</h2>
        {error && <div className="signup-error">{error}</div>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>New Password</label>
        <div className="signup-password-row">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            autoComplete="new-password"
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
        <label>Confirm Password</label>
        <div className="signup-password-row">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            autoComplete="new-password"
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-pass-btn"
            onClick={() => setShowConfirm(v => !v)}
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="signup-policy-row">
          <input
            type="checkbox"
            id="privacy"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            required
          />
          <label htmlFor="privacy" className="signup-policy-label">
            I accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and Terms of Service.
          </label>
        </div>
        <button type="submit" className="signup-btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
