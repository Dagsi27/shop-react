import React from "react";
import styles from "./ProfilePage.module.css";

const ProfileHeader = ({ setActiveSection, activeSection }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.header}`}>
      <div className="container d-flex justify-content-center">
        <button
          className={`btn ${activeSection === "profile" ? styles.active : ""}`}
          onClick={() => setActiveSection("profile")}
        >
          Profil
        </button>
        <button
          className={`btn ${activeSection === "ads" ? styles.active : ""}`}
          onClick={() => setActiveSection("ads")}
        >
          Ogłoszenia
        </button>
        <button
          className={`btn ${activeSection === "history" ? styles.active : ""}`}
          onClick={() => setActiveSection("history")}
        >
          Historia Zakupów
        </button>
      </div>
    </nav>
  );
};

export default ProfileHeader;
