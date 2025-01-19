import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const TransactionForm = () => {
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/transactions', { type, amount, date, description, categoryId })
            .then(() => {
                navigate('/transactions');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h2>Create Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Type:</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;
