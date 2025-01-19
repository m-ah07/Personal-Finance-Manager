import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome to your personal finance overview!</p>
      <Link to="/transactions" className="btn btn-primary">View Transactions</Link>
    </div>
  );
};

export default Dashboard;
