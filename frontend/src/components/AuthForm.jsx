import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      api.post('/users/login', { email, password })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          login(res.data.user);
          navigate('/dashboard');
        })
        .catch((err) => {
          setError(err.response?.data?.message || err.response?.data?.error || 'Login failed. Please try again.');
        })
        .finally(() => setLoading(false));
    } else {
      api.post('/users/signup', { name, email, password })
        .then(() => {
          setSuccess('Signup successful! You can now log in.');
          setIsLogin(true);
          setName('');
          setEmail('');
          setPassword('');
        })
        .catch((err) => {
          setError(err.response?.data?.message || err.response?.data?.error || 'Signup failed. Please try again.');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card p-4">
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <p className="mt-2 text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          type="button"
          className="btn btn-link p-1 ms-1"
          onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
