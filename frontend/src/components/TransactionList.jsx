import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Transaction List</h2>
      <ul className="list-group">
        {transactions.map(tx => (
          <li key={tx._id} className="list-group-item">
            <strong>{tx.type}:</strong> ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
