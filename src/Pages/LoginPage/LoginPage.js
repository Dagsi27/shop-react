import React from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
      <div className={styles.cardContainer}>
        <div className={styles.leftSection}>
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <p className="text-center text-muted mb-4">Login to continue</p>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="******"
              />
            </div>
            <div className="text-end mb-3">
              <a href="/forgot-password" className={styles.link}>Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-dark w-100">Login</button>
          </form>
          <div className="text-center mt-4">
            <p>
              Don’t have an account?{" "}
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
