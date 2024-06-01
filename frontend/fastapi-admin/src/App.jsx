import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import FoodsPage from './pages/FoodsPage';
import RecipesPage from './pages/RecipesPage';
import './styles/main.css';

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <Link to="/users" className="nav-link">Users</Link>
        <Link to="/foods" className="nav-link">Foods</Link>
        <Link to="/" className="nav-link">Recipes</Link>
      </div>
      <div className="page-content">
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/" element={<RecipesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;