import React from "react";
import styles from "./ProductPage.module.css";
import productData from "../data/products.json";

const ProductPage = () => {
  const product = productData.products[0]; // Pobieramy pierwszy produkt

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.name}
        />
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>Cena: {product.price} zł</p>
          <p className={styles.productRating}>
            Ocena: ⭐ {product.rating.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
