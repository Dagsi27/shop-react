import React, { useState, useRef, useEffect } from "react";
import productData from "../../Data/products.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "bootstrap";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [orderQuantity, setOrderQuantity] = useState("1");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    if (value === "" || numericValue <= 0) {
      setError("Enter a quantity equal to 1 or greater.");
    } else if (numericValue > product.stock) {
      setError(`Please enter a number less than  ${product.stock + 1}.`);
    } else {
      setError(""); // Brak błędów
    }

    setOrderQuantity(value);
  };
  const { productId } = useParams(); // Pobiera ID produktu z URL
  const product = productData.products.find(
    (product) => String(product.id) === productId
  );
  console.log(product); // Wyświetla znaleziony produkt w konsoli

  const [activeIndex, setActiveIndex] = useState(0); // Stan dla aktywnego indeksu w karuzeli
  const [currentRow, setCurrentRow] = useState(0); // Stan dla aktualnego rzędu miniatur
  const thumbnailsPerRow = 9; // Liczba miniatur na jeden rząd
  const carouselRef = useRef(null); // Referencja do karuzeli

  useEffect(() => {
    if (carouselRef.current) {
      const carouselInstance = Carousel.getOrCreateInstance(
        carouselRef.current
      );

      // Obsługuje zdarzenie przesunięcia karuzeli
      const handleSlid = (event) => {
        const newIndex = Number(event.to);
        setActiveIndex(newIndex);

        const newRow = Math.floor(newIndex / thumbnailsPerRow);
        if (newRow !== currentRow) {
          setCurrentRow(newRow);
        }
      };

      // Dodanie nasłuchiwacza zdarzeń do karuzeli
      carouselInstance._element.addEventListener(
        "slid.bs.carousel",
        handleSlid
      );

      return () => {
        // Usunięcie nasłuchiwacza zdarzeń podczas odmontowania komponentu
        carouselInstance._element.removeEventListener(
          "slid.bs.carousel",
          handleSlid
        );
      };
    }
  }, [currentRow, thumbnailsPerRow]);

  if (!product) {
    // Jeśli produkt nie został znaleziony, wyświetla komunikat
    return <div className={styles.notFound}>Product not found!</div>;
  }

  // Obsługuje kliknięcie miniatury, zmienia aktywny indeks karuzeli
  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      const carouselInstance = Carousel.getOrCreateInstance(
        carouselRef.current
      );
      carouselInstance.to(index);
    }
    setActiveIndex(index);
  };

  const startIndex = currentRow * thumbnailsPerRow; // Początkowy indeks miniatur w bieżącym rzędzie
  const endIndex = Math.min(
    startIndex + thumbnailsPerRow,
    product.images.length
  ); // Końcowy indeks miniatur w bieżącym rzędzie
  const thumbnailsToDisplay = product.images.slice(startIndex, endIndex); // Wybrane miniatury do wyświetlenia

  // Wyklucza określone pola i zwraca szczegóły produktu do sekcji "O produkcie"
  const aboutProductDetails = Object.entries(product)
    .filter(([key]) => key !== "id" && key !== "category")
    .slice(9);

  // Funkcja renderująca gwiazdki w oparciu o ocenę produktu
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Liczba pełnych gwiazdek
    const hasHalfStar = rating % 1 >= 0.5; // Sprawdza, czy jest potrzeba pół gwiazdki
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Reszta jako puste gwiazdki
    const stars = [];

    // Pełne gwiazdki
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          className="bi bi-star-fill"
          style={{ color: "#FFD700" }}
        ></span>
      );
    }

    // Pół gwiazdki
    if (hasHalfStar) {
      stars.push(
        <span
          key="half"
          className="bi bi-star-half"
          style={{ color: "#FFD700" }}
        ></span>
      );
    }

    // Puste gwiazdki
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className="bi bi-star"
          style={{ color: "#FFD700" }}
        ></span>
      );
    }

    return stars;
  };

  return (
    <>
      <div className={`container mt-5 ${styles.productContainer}`}>
        {/* Link do powrotu na stronę główną */}
        <div className={`d-flex flex-row mb-3 ${styles.backToMainPage}`}>
          <Link to="/" className={`link-secondary ${styles.linkStyle}`}>
            <i className={`bi bi-arrow-left-circle${styles.arrowStyle}`}></i>Go
            back to Main Page
          </Link>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              id="productCarousel"
              className={`carousel slide ${styles.carousel}`}
              data-bs-ride="carousel"
              ref={carouselRef}
            >
              <div className={`carousel-inner ${styles.carouselInner}`}>
                {/* Wyświetla obrazy w karuzeli */}
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <img
                      src={image}
                      className={`d-block w-100 ${styles.itemImage}`}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Przyciski nawigacyjne karuzeli */}
              <button
                className={`carousel-control-prev ${styles.customControl}`}
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
              >
                <span
                  className={`carousel-control-prev-icon ${styles.controlIcon}`}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Poprzedni</span>
              </button>
              <button
                className={`carousel-control-next ${styles.customControl}`}
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
              >
                <span
                  className={`carousel-control-next-icon ${styles.controlIcon}`}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Następny</span>
              </button>
            </div>

            {/* Kontener miniatur */}
            <div
              className={`d-flex flex-column mt-3 align-items-center ${styles.thumbnailContainer}`}
            >
              <div className="d-flex justify-content-between w-100">
                <button
                  className={`btn btn-secondary ${styles.rowControl}`}
                  onClick={() =>
                    setCurrentRow((prevRow) => Math.max(prevRow - 1, 0))
                  }
                >
                  Previous Photos
                </button>
                <button
                  className={`btn btn-secondary ${styles.rowControl}`}
                  onClick={() =>
                    setCurrentRow((prevRow) =>
                      Math.min(
                        prevRow + 1,
                        Math.ceil(product.images.length / thumbnailsPerRow) - 1
                      )
                    )
                  }
                >
                  Next Photos
                </button>
              </div>
              <div className="d-flex mt-2">
                {/* Wyświetla miniatury */}
                {thumbnailsToDisplay.map((image, index) => {
                  const globalIndex = startIndex + index;
                  return (
                    <img
                      key={globalIndex}
                      src={image}
                      alt={`Miniatura ${globalIndex + 1}`}
                      className={`${styles.thumbnail} ${
                        globalIndex === activeIndex
                          ? styles.activeThumbnail
                          : ""
                      }`}
                      onClick={() => handleThumbnailClick(globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Szczegóły produktu */}
          <div className={`col-md-6 ${styles.productDetails}`}>
            <h2 className="mb-4">{product.name}</h2>
            <p>
              <strong>Rating:</strong> {renderStars(product.rating)}
            </p>
            <p>
              <strong>Price:</strong> {product.price} PLN
            </p>
            <div className="mt-4">
              <div className="mb-3">
                <label htmlFor="orderQuantity" className="form-label">
                  <strong>Stock:</strong> {product.stock}
                </label>
                <input
                  type="number"
                  id="orderQuantity"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  min="1"
                  max={product.stock}
                  value={orderQuantity}
                  onChange={handleInputChange}
                  required
                />
                {!error && (
                  <small className="form-text text-muted">
                    You can place order up to {product.stock}.
                  </small>
                )}
                {error && <small className="text-danger">{error}</small>}
              </div>
            </div>
            <p>
              <strong>Sold:</strong> {product.sold}
            </p>

            <button
              className={`btn btn-primary ${styles.addToCartButton}`}
              disabled={!!error || orderQuantity === ""}
            >
              Add to Cart
            </button>
            <button className={`btn btn-primary ${styles.addToCartButton}`}>
              Add to Followed
            </button>

            {/* Koszt wysyłki i czas dostawy */}
            <div className="mt-5">
              <p>
                <strong>Shipment Cost:</strong> {product.shipping_cost} PLN
              </p>
              <p>
                <strong>Shipment Time:</strong> {product.delivery_time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja "O produkcie" */}
      <div className={`container mt-5 ${styles.productContainer}`}>
        <div className={`mt-1 ${styles.aboutProduct}`}>
          <h2>About Product</h2>
          {product.description && (
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          )}

          {/* Wyświetla dodatkowe szczegóły produktu */}
          {aboutProductDetails.map(([key, value]) => (
            <p key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
