import React from "react";
import styles from "./PurchaseHistoryPage.module.css";

const PurchaseHistoryPage = () => {
  const purchases = [
    {
      id: 1,
      name: "Smartfon Samsung Galaxy S21",
      price: "3200 zł",
      date: "12.11.2024",
      status: "Dostarczono",
    },
    {
      id: 2,
      name: "Słuchawki bezprzewodowe Sony WH-1000XM4",
      price: "1400 zł",
      date: "05.10.2024",
      status: "Dostarczono",
    },
  ];

  return (
    <div className={`container ${styles.purchaseHistory}`}>
      <h2 className="mb-4">Historia Zakupów</h2>
      {purchases.map((purchase) => (
        <div key={purchase.id} className={`${styles.purchaseBox} p-4 mb-3`}>
          <h5>{purchase.name}</h5>
          <p>
            <strong>Cena:</strong> {purchase.price}
          </p>
          <p>
            <strong>Data zakupu:</strong> {purchase.date}
          </p>
          <p>
            <strong>Status:</strong> {purchase.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistoryPage;
