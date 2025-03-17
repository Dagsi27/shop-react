import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { useApiJson } from "../../config/api";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    newsletter: false,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const apiJson = useApiJson();
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id === 'confirmPassword' ? 'confirmPassword' : id]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is being edited
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiJson.post('register', {
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword
      });
       
      toast.success('Registration successful! You can now log in.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
        console.error('Registration error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('Registration failed. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
          <form onSubmit={handleSubmit}>
            {/* Login */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Login</label>
              <input
                type="text"
                id="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Enter your login"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
            
            {/* Checkbox: Newsletter */}
            <div className="form-check mb-2">
              <input 
                type="checkbox" 
                className="form-check-input" 
                id="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="newsletter">
                I agree to receive the newsletter <small className="text-muted">(optional)</small>
              </label>
            </div>
            
            {/* Checkbox: Terms */}
            <div className="form-check mb-3">
              <input 
                type="checkbox" 
                className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`} 
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="terms">
                I accept the terms and conditions.
              </label>
              {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-dark w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
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