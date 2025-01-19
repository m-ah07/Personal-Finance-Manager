import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
