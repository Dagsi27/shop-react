import React from 'react';
import './Footer.css'; // Import pliku CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/terms" className="footer-link">Terms</a>
        <a href="/privacy" className="footer-link">Privacy</a>
        <a href="/cookies" className="footer-link">Cookies</a>
      </div>
      <div className="footer-icons">
        <a href="https://facebook.com" className="footer-icon" aria-label="Facebook">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://twitter.com" className="footer-icon" aria-label="Twitter">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="/contact" className="footer-icon" aria-label="Contact">
          <i className="bi bi-chat-dots"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
