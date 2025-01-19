import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Personal Finance Manager
          </Link>
          <div>
            <Link to="/dashboard" className="btn btn-outline-primary me-2">
              Dashboard
            </Link>
            <Link to="/transactions" className="btn btn-outline-secondary">
              Transactions
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transaction/new" element={<TransactionForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
