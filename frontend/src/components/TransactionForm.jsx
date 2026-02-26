import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingData, setLoadingData] = useState(isEdit);

  useEffect(() => {
    api.get('/categories')
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isEdit) {
      api.get(`/transactions/${id}`)
        .then((res) => {
          const tx = res.data;
          setType(tx.type);
          setAmount(String(tx.amount));
          setDate(tx.date ? new Date(tx.date).toISOString().slice(0, 10) : '');
          setDescription(tx.description || '');
          setCategoryId(tx.categoryId?._id || tx.categoryId || '');
        })
        .catch((err) => setError(err.response?.data?.message || 'Failed to load transaction.'))
        .finally(() => setLoadingData(false));
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      type,
      amount: parseFloat(amount),
      date,
      description: description || undefined,
      categoryId: categoryId || undefined
    };

    const promise = isEdit
      ? api.put(`/transactions/${id}`, payload)
      : api.post('/transactions', payload);

    promise
      .then(() => {
        navigate('/transactions');
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.response?.data?.error || 'Failed to save transaction.');
      })
      .finally(() => setLoading(false));
  };

  if (loadingData) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2>{isEdit ? 'Edit Transaction' : 'Create Transaction'}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
