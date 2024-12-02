import React, { useState, useRef, useEffect } from "react";
import productData from "../../Data/products.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const product = productData.products.find((product) =>
    product.name.toLowerCase().replaceAll(" ", "_")
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const thumbnailsPerRow = 9;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carouselInstance = Carousel.getOrCreateInstance(carouselRef.current);

      const handleSlid = (event) => {
        const newIndex = Number(event.to);
        setActiveIndex(newIndex);

        const newRow = Math.floor(newIndex / thumbnailsPerRow);
        if (newRow !== currentRow) {
          setCurrentRow(newRow);
        }
      };

      carouselInstance._element.addEventListener("slid.bs.carousel", handleSlid);

      return () => {
        carouselInstance._element.removeEventListener("slid.bs.carousel", handleSlid);
      };
    }
  }, [currentRow, thumbnailsPerRow]);

  if (!product) {
    return <div className={styles.notFound}>Product not found!</div>;
  }

  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      const carouselInstance = Carousel.getOrCreateInstance(carouselRef.current);
      carouselInstance.to(index);
    }
    setActiveIndex(index);
  };

  const startIndex = currentRow * thumbnailsPerRow;
  const endIndex = Math.min(startIndex + thumbnailsPerRow, product.images.length);
  const thumbnailsToDisplay = product.images.slice(startIndex, endIndex);

  // Rest of the entries for "About that Product"
  const aboutProductDetails = Object.entries(product)
    .filter(([key]) => key !== "id" && key !== "category")
    .slice(9);

  // Rating function to generate stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="bi bi-star-fill" style={{ color: "#FFD700" }}></span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="bi bi-star" style={{ color: "#FFD700" }}></span>);
    }

    return stars;
  };

  return (
    <>
      <div className={`container mt-5 ${styles.productContainer}`}>
        
              {/* Link to return to the main page */}
      <div className={`d-flex flex-row mb-3 ${styles.backToMainPage}`}>
      
        <Link to="/" className={`link-secondary ${styles.linkStyle}`}><i className={`bi bi-arrow-left-circle ${styles.arrowStyle}`}></i>Back to Main Page</Link>
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
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                  >
                    <img
                      src={image}
                      className={`d-block w-100 ${styles.itemImage}`}
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

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
                <span className="visually-hidden">Previous</span>
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
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className={`d-flex flex-column mt-3 align-items-center ${styles.thumbnailContainer}`}>
              <div className="d-flex justify-content-between w-100">
                <button
                  className={`btn btn-secondary ${styles.rowControl}`}
                  onClick={() => setCurrentRow((prevRow) => Math.max(prevRow - 1, 0))}
                >
                  Previous Row
                </button>
                <button
                  className={`btn btn-secondary ${styles.rowControl}`}
                  onClick={() =>
                    setCurrentRow((prevRow) =>
                      Math.min(prevRow + 1, Math.ceil(product.images.length / thumbnailsPerRow) - 1)
                    )
                  }
                >
                  Next Row
                </button>
              </div>
              <div className="d-flex mt-2">
                {thumbnailsToDisplay.map((image, index) => {
                  const globalIndex = startIndex + index;
                  return (
                    <img
                      key={globalIndex}
                      src={image}
                      alt={`Thumbnail ${globalIndex + 1}`}
                      className={`${styles.thumbnail} ${
                        globalIndex === activeIndex ? styles.activeThumbnail : ""
                      }`}
                      onClick={() => handleThumbnailClick(globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`col-md-6 ${styles.productDetails}`}>
            <h2 className="mb-4">{product.name}</h2>

            <p><strong>Rating:</strong> {renderStars(product.rating)}</p>

            <p><strong>Price:</strong> {product.price} PLN</p>

            <p><strong>Stock:</strong> {product.stock}</p>

            <p><strong>Sold:</strong> {product.sold}</p>

            <button className={`btn btn-primary ${styles.addToCartButton}`}>Add to Cart</button>
            <button className={`btn btn-primary ${styles.addToCartButton}`}>Add to Followed</button>

            {/* Shipping cost and Delivery time */}
            <div className="mt-5">
              <p><strong>Shipping Cost:</strong> {product.shipping_cost} PLN</p>
              <p><strong>Delivery Time:</strong> {product.delivery_time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About that Product Section */}
      <div className={`container mt-5 ${styles.productContainer}`}>
        <div className={`mt-1 ${styles.aboutProduct}`}>
          <h2>About that Product</h2>
          {/* Add description to the "About that Product" section */}
          {product.description && (
            <p><strong>Description:</strong> {product.description}</p>
          )}
          
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
