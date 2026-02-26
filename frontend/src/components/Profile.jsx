import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/users/profile')
      .then((res) => setUser(res.data))
      .catch((err) => setError(err.response?.data?.message || err.response?.data?.error || 'Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <div className="card" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-0"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
