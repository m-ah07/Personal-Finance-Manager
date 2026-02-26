require('dotenv').config(); // If you're using a .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/personal_finance';

// Connect to MongoDB first, then start server
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('\nMake sure MongoDB is running. Options:');
    console.error('  1. Start MongoDB locally: mongod');
    console.error('  2. Use MongoDB Atlas: set DB_URI in .env');
    process.exit(1);
  });
