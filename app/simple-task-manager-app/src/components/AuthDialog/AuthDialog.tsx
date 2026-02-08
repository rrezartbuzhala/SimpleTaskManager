import { useState } from 'react';
import './AuthDialog.css';
import { authenticate, saveAuthCreds } from '../../services/authService';

interface AuthDialogProps {
  onSuccess: (authHeader: string) => void;
}

export default function AuthDialog({ onSuccess }: AuthDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const resp = await authenticate(username, password);

      if (resp.status === 401) {
        setError('Unauthorized');
      } else if (typeof resp.data === 'string' && resp.data.includes('Authorized')) {
        saveAuthCreds(resp.hashed);
        onSuccess(resp.header);
      } else {
        setError('Authentication failed');
      }
    } catch (err: any) {
      setError(err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <form className="auth-dialog" onSubmit={submit}>
        <h2>Sign in</h2>
        {error && <div className="auth-error">{error}</div>}
        <label>
          Username
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <div className="auth-actions">
          <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
