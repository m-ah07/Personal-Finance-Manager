import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import CategoryList from "./components/CategoryList";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const navProps = {
    'data-bs-toggle': 'collapse',
    'data-bs-target': '#navbarNav'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" {...navProps}>
          Personal Finance Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex align-items-center gap-2 ms-lg-auto flex-wrap">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-outline-light btn-sm" {...navProps}>
                  Dashboard
                </Link>
                <Link to="/transactions" className="btn btn-outline-light btn-sm" {...navProps}>
                  Transactions
                </Link>
                <Link to="/transaction/new" className="btn btn-outline-light btn-sm" {...navProps}>
                  Add Transaction
                </Link>
                <Link to="/categories" className="btn btn-outline-light btn-sm" {...navProps}>
                  Categories
                </Link>
                <Link to="/profile" className="btn btn-outline-light btn-sm" {...navProps}>
                  Profile
                </Link>
                <span className="text-white small d-none d-md-inline">Hi, {user?.name}</span>
                <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="btn btn-outline-light btn-sm" {...navProps}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><AuthForm /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><TransactionList /></ProtectedRoute>} />
      <Route path="/transaction/new" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
      <Route path="/transaction/:id/edit" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const Footer = () => (
  <footer className="mt-5 py-3 text-center text-muted small border-top">
    <div className="container">
      Personal Finance Manager &middot; Track your income and expenses
    </div>
  </footer>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <AppRoutes />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
