import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useApiJson } from "../../config/api";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      
      const loginData = {
        email: String(username).trim(),
        password: String(password)
      };
      
      const response = await axios.post('/api/login', loginData);
      
      if (response.data && response.data.token) {
        const token = response.data.token;
        
        login(loginData.email, token);
        
        toast.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
        toast.error('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
      <div className={styles.cardContainer}>
        <div className={styles.leftSection}>
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <p className="text-center text-muted mb-4">Login to continue</p>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Email</label>
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="example@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-end mb-3">
              <a href="/forgot-password" className={styles.link}>Forgot password?</a>
            </div>
            <button 
              type="submit" 
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <a href="/register" className={styles.link}>Sign Up for free</a>
            </p>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.imageOverlay}>
            <img
              src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shopping Background"
              className={styles.backgroundImage}
            />
            <div className={styles.textOverlay}>
              <h1>Discover Amazing Deals</h1>
              <p>Shop your favorites and enjoy great discounts!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;