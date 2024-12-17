import React from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
      <div className={styles.cardContainer}>
        {/* Left Side: Image Section */}
        <div className={styles.leftSection}>
          <div className={styles.imageOverlay}>
            <img
              src="https://images.unsplash.com/photo-1532310456006-ddaf275c93cd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shopping Background"
              className={styles.backgroundImage}
            />
            <div className={styles.textOverlay}>
              <h1>Join Us Today</h1>
              <p>Discover amazing deals and start your journey!</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className={styles.rightSection}>
          <h2 className="text-center mb-4">Create an Account</h2>
          <form>
            {/* Login */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Login</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your login"
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
              />
            </div>
            {/* Checkbox: Newsletter */}
            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" id="newsletter" />
              <label className="form-check-label" htmlFor="newsletter">
                I agree to receive the newsletter <small className="text-muted">(optional)</small>
              </label>
            </div>
            {/* Checkbox: Terms */}
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label className="form-check-label" htmlFor="terms">
                I accept the terms and conditions.
              </label>
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-dark w-100">Register</button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <a href="/login" className={styles.link}>Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
