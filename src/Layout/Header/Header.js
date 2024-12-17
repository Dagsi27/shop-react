import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import appStore from "../../../src/assets/icons/appStore.svg";

const Header = () => {
  return (
    <header className={`${styles.header} border-bottom py-2`}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo + Tytuł */}
        <div className="d-flex align-items-center">
          <div className={`${styles.logo} me-3`}>
            {/* Przekierowanie na stronę główną */}
            <Link to="/">
              <img src={appStore} alt="shop-icon" className={styles.shopIcon} />
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <Link to="/" className={styles.shopTitle}>
              SHOP APP
            </Link>
          </div>
        </div>

        {/* Nawigacja */}
        <nav className="flex-grow-1 d-flex justify-content-center">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className={`${styles.navLink} nav-link active`}>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className={`${styles.navLink} nav-link`}>
                Community
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className={`${styles.navLink} nav-link`}>
                Resources
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className={`${styles.navLink} nav-link`}>
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className={`${styles.navLink} nav-link`}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Ikony + Przyciski */}
        <div className="d-flex align-items-center">
          <a href="#" className={`${styles.iconLink} me-3`}>
            <i className="bi bi-search fs-3"></i>
          </a>
          <a href="#" className={`${styles.iconLink} me-3`}>
            <i className="bi bi-heart fs-3"></i>
          </a>
          <a href="#" className={`${styles.iconLink} me-3`}>
            <i className="bi bi-cart fs-3"></i>
          </a>
          <Link to="/login">
            <button className="btn btn-outline-dark me-1">Sign in</button>
          </Link>
          <Link to="/register">
          <button className="btn btn-dark">Register</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
