import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/timer');
    } catch (err) {
      setError(err.response?.data?.message || 'failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">welcome back</h1>
        <p className="auth-subtitle">log in to continue</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
              disabled={loading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'logging in...' : 'log in'}
          </button>
        </form>

        <p className="auth-link">
          don't have an account? <Link to="/signup">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;