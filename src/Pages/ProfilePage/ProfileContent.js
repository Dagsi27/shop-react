import React from "react";
import styles from "./ProfilePage.module.css";

const ProfileContent = () => {
  return (
    <div className="container mt-4">
      {/* Profil użytkownika */}
      <div className={`${styles.profileBox} p-4`}>
        <div className="row align-items-center">
          <div className="col-md-2 text-center">
            <div className={styles.avatar}>
              <span>🧑</span>
            </div>
          </div>
          <div className="col-md-10">
            <h3>Jan Kowalski</h3>
            <p className={styles.viewProfileLink}>
              <a href="#">Zobacz, jak inni widzą Twój profil</a>
            </p>
            <p className="text-muted">jan.kowalski@example.com | +48 600 123 456</p>
          </div>
        </div>
      </div>

      {/* Sekcja podstawowych informacji */}
      <div className={`${styles.infoBox} mt-4 p-4`}>
        <h5>PODSTAWOWE INFORMACJE</h5>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Imię i nazwisko:</strong> Jan Kowalski</p>
            <p><strong>Data urodzenia:</strong> 10.05.1985</p>
            <p><strong>Miasto:</strong> Warszawa</p>
          </div>
          <div className="col-md-6">
            <p><strong>Adres e-mail:</strong> jan.kowalski@example.com</p>
            <p><strong>Numer telefonu:</strong> +48 600 123 456</p>
          </div>
        </div>
        <button className="btn btn-outline-dark">Edytuj</button>
      </div>

      {/* Sekcja danych do przelewów */}
      <div className={`${styles.infoBox} mt-4 p-4`}>
        <h5>DANE DO PRZELEWÓW</h5>
        <p>
          <strong>Nazwa banku:</strong> PKO Bank Polski<br />
          <strong>Numer konta:</strong> 12 3456 7890 1234 5678 9012 3456
        </p>
        <p>
          Twoje dane zostały zweryfikowane pomyślnie. .
        </p>
        <a href="#" className={styles.boldText}>
          Zmień dane do przelewów
        </a>
      </div>
    </div>
  );
};

export default ProfileContent;
