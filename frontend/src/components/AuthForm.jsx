import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      api.post('/users/login', { email, password })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        })
        .catch(err => console.error(err));
    } else {
      api.post('/users/signup', { name, email, password })
        .then(() => {
          alert('Signup successful! You can now log in.');
          setIsLogin(true);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        {!isLogin && (
          <div className="mb-3">
            <label>Name:</label>
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
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-2 text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          className="btn btn-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
