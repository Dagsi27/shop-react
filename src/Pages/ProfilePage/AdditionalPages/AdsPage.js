import React from "react";
import styles from "./AdsPage.module.css";

const AdsPage = () => {
  const ads = [
    {
      id: 1,
      title: "Sprzedam rower górski",
      description: "Rower w dobrym stanie, używany przez rok.",
      price: "1200 zł",
      date: "15.12.2024",
    },
    {
      id: 2,
      title: "Laptop gamingowy",
      description: "Świetny laptop do gier. Intel i7, RTX 3070.",
      price: "4500 zł",
      date: "10.12.2024",
    },
  ];

  return (
    <div className={`container ${styles.adsPage}`}>
      <h2 className="mb-4">Twoje ogłoszenia</h2>
      {ads.map((ad) => (
        <div key={ad.id} className={`${styles.adBox} p-4 mb-3`}>
          <h5>{ad.title}</h5>
          <p>{ad.description}</p>
          <p>
            <strong>Cena: </strong> {ad.price}
          </p>
          <p>
            <small>Dodano: {ad.date}</small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdsPage;
