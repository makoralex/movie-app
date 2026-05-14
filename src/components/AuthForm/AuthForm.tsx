import { useState } from 'react';
import authService from '../../services/AuthService';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }

      navigate('/');
    } catch {
      setError('authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'login' : 'register'}</h2>

        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'loading...' : isLogin ? 'login' : 'create account'}
        </button>

        <p className="auth-switch">
          {isLogin ? "don't have an account?" : 'already have an account?'}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' register' : ' login'}
          </span>
        </p>
      </form>
    </section>
  );
};

export default AuthForm;
