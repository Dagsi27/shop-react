import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import appStore from "../../../src/assets/icons/appStore.svg";

const Header = () => {
  return (
    <header className="header border-bottom py-2">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="logo me-3">
            <img src={appStore} alt="shop-icon" className="shop-icon" />
          </div>
          <div className="title-container">
            <span className="shop-title">SHOP APP</span>
          </div>
        </div>

        <nav className="flex-grow-1 d-flex justify-content-center">
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link active">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Community
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Resources
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="d-flex align-items-center">
          <a href="#" className="icon-link me-3">
            <i className="bi bi-search fs-3"></i>
          </a>
          <a href="#" className="icon-link me-3">
            <i className="bi bi-heart fs-3"></i>
          </a>
          <a href="#" className="icon-link me-3">
            <i className="bi bi-cart fs-3"></i>
          </a>
          <button className="btn btn-outline-dark me-1">Sign in</button>
          <button className="btn btn-dark ">Register</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
