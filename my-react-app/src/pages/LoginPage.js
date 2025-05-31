import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Testdata istället för fetch
    const users = [
      { email: 'efritioff@gmail.com', password: '123456' }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Inloggning lyckades!');
      navigate('/admin');
    } else {
      alert('Fel e-post eller lösenord.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <header>
        <p className="PL">Login</p>
      </header>

      <div className="main">
        <form id="loginForm" onSubmit={handleLogin}>
          <label htmlFor="first">Email adress</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="password-label" htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="myInput"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="show-password-toggle">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <div className="wrap">
            <button className="Login-Button" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
