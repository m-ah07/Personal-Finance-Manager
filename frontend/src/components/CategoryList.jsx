import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    api.get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load categories.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    setError('');
    api.post('/categories', { name: newName.trim() })
      .then(() => {
        setSuccess('Category added successfully.');
        setNewName('');
        fetchCategories();
        setTimeout(() => setSuccess(''), 3000);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to add category.'))
      .finally(() => setAdding(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure? Transactions using this category will have no category.')) return;
    api.delete(`/categories/${id}`)
      .then(() => {
        setSuccess('Category deleted.');
        fetchCategories();
        setTimeout(() => setSuccess(''), 3000);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to delete.'));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading categories...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Categories</h2>
      <p className="text-muted">Manage your transaction categories.</p>

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

      <form onSubmit={handleAdd} className="row g-2 mb-4">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary" disabled={adding}>
            {adding ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {categories.length === 0 ? (
          <li className="list-group-item text-center text-muted">No categories yet. Add one above.</li>
        ) : (
          categories.map((c) => (
            <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{c.name}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
