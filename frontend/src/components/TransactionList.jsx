import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchTransactions = () => {
    setLoading(true);
    api.get('/transactions')
      .then((res) => setTransactions(res.data))
      .catch((err) => setError(err.response?.data?.message || err.response?.data?.error || 'Failed to load transactions.'))
      .finally(() => setLoading(false));
  };

  const fetchCategories = () => {
    api.get('/categories')
      .then((res) => setCategories(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    api.delete(`/transactions/${id}`)
      .then(() => {
        setSuccess('Transaction deleted successfully.');
        fetchTransactions();
        setTimeout(() => setSuccess(''), 3000);
      })
      .catch((err) => setError(err.response?.data?.message || err.response?.data?.error || 'Failed to delete.'));
  };

  const filtered = transactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (filterCategory && tx.categoryId?._id !== filterCategory && tx.categoryId !== filterCategory) return false;
    return true;
  });

  const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transactions</h2>
        <Link to="/transaction/new" className="btn btn-primary">
          Add Transaction
        </Link>
      </div>

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

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <ul className="list-group">
        {filtered.length === 0 ? (
          <li className="list-group-item text-center text-muted">No transactions found.</li>
        ) : (
          filtered.map((tx) => (
            <li key={tx._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className={`badge bg-${tx.type === 'income' ? 'success' : 'danger'} me-2`}>
                  {tx.type}
                </span>
                <strong>{formatCurrency(tx.amount)}</strong>
                <span className="text-muted ms-2">
                  {new Date(tx.date).toLocaleDateString()}
                  {tx.categoryId?.name && ` · ${tx.categoryId.name}`}
                </span>
                {tx.description && <div className="small text-muted">{tx.description}</div>}
              </div>
              <div>
                <Link to={`/transaction/${tx._id}/edit`} className="btn btn-sm btn-outline-primary me-1">
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
