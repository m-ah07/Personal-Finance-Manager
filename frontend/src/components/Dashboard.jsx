import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/transactions')
      .then((res) => {
        const transactions = res.data;
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        setStats({
          income,
          expense,
          balance: income - expense
        });
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.response?.data?.error || 'Failed to load transactions.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading dashboard...</p>
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

  const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div>
      <h2>Dashboard</h2>
      <p className="text-muted">Welcome to your personal finance overview!</p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Total Income</h6>
              <h4 className="card-title">{formatCurrency(stats.income)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Total Expenses</h6>
              <h4 className="card-title">{formatCurrency(stats.expense)}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card ${stats.balance >= 0 ? 'bg-primary' : 'bg-warning'} text-white`}>
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Balance</h6>
              <h4 className="card-title">{formatCurrency(stats.balance)}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <Link to="/transactions" className="btn btn-primary">
          View Transactions
        </Link>
        <Link to="/transaction/new" className="btn btn-outline-primary">
          Add Transaction
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
