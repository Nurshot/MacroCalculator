import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });
      setToken(response.data.access_token);
      setError(''); // Clear error message on successful login
    } catch (error) {
      setError('Login failed: ' + error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default LoginPage;
