import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminLoginPage.css";
import authFetch from '../../utils/auth';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // reset previous errors

    try {
      const res = await authFetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      localStorage.setItem('token', data.token);
      navigate('/admin/home');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="login-title">Admin Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="login-button">Login</button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default AdminLoginPage;
