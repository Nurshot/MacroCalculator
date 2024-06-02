import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import UsersPage from './pages/UsersPage';
import FoodsPage from './pages/FoodsPage';
import RecipesPage from './pages/RecipesPage';
import LoginPage from './pages/LoginPage';
import ProtectedAuth from './components/ProtectedAuth';
import './styles/main.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <Router>
      {token && (
        <div className="navbar">
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/foods" className="nav-link">Foods</Link>
          <Link to="/" className="nav-link">Recipes</Link>
        </div>
      )}
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} setUser={setUser} />} />
          <Route path="/users" element={<ProtectedAuth element={UsersPage} token={token} user={user} />} />
          <Route path="/foods" element={<ProtectedAuth element={FoodsPage} token={token} user={user} />} />
          <Route path="/" element={<ProtectedAuth element={RecipesPage} token={token} user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
