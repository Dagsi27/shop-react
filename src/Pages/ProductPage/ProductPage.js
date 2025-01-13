import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState("1");
  const [error, setError] = useState("");
  const { productId } = useParams();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const thumbnailsPerRow = 9;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct({
          ...data,
          images: [data.imageUrl || '/placeholder-image.jpg'],
          rating: data.rating || 4.5,
          stock: data.quantity || 0,
          sold: data.soldQuantity || 0,
          shipping_cost: "Free",
          delivery_time: "2-3 business days",
          description: data.description || "No description available"
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
  }, [currentRow]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    if (value === "" || numericValue <= 0) {
      setError("Enter a quantity equal to 1 or greater.");
    } else if (numericValue > product.stock) {
      setError(`Please enter a number less than ${product.stock + 1}.`);
    } else {
      setError("");
    }

    setOrderQuantity(value);
  };

  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      const carouselInstance = Carousel.getOrCreateInstance(carouselRef.current);
      carouselInstance.to(index);
    }
    setActiveIndex(index);
  };

  if (loading) {
    return <div className={styles.productContainer}>Loading...</div>;
  }

  if (error && !product) {
    return <div className={`${styles.productContainer} ${styles.notFound}`}>Error: {error}</div>;
  }

  if (!product) {
    return <div className={`${styles.productContainer} ${styles.notFound}`}>Product not found!</div>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="bi bi-star-fill" style={{ color: "#FFD700" }}></span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="bi bi-star-half" style={{ color: "#FFD700" }}></span>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="bi bi-star" style={{ color: "#FFD700" }}></span>
      );
    }

    return stars;
  };

  return (
    <>
      <div className={`container mt-5 ${styles.productContainer}`}>
        <div className={`d-flex flex-row mb-3 ${styles.backToMainPage}`}>
          <Link
            to={`/products?category_id=${product.category?.id || ""}`}
            className={`link-secondary ${styles.linkStyle}`}
          >
            <i className={`bi bi-arrow-left-circle ${styles.arrowStyle}`}></i>
            Back to Products
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
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === activeIndex ? "active" : ""} ${styles['carousel-item']}`}
                  >
                    <img
                      src={image}
                      className={`d-block w-100 ${styles.itemImage}`}
                      alt={`${product.name} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              {product.images.length > 1 && (
                <>
                  <button
                    className={`carousel-control-prev ${styles.customControl}`}
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
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
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className={`d-flex flex-column mt-3 align-items-center ${styles.thumbnailContainer}`}>
                <div className="d-flex justify-content-between w-100">
                  <button
                    className={`btn btn-secondary ${styles.rowControl}`}
                    onClick={() => setCurrentRow((prevRow) => Math.max(prevRow - 1, 0))}
                    disabled={currentRow === 0}
                  >
                    Previous Photos
                  </button>
                  <button
                    className={`btn btn-secondary ${styles.rowControl}`}
                    onClick={() => setCurrentRow((prevRow) =>
                      Math.min(
                        prevRow + 1,
                        Math.ceil(product.images.length / thumbnailsPerRow) - 1
                      )
                    )}
                    disabled={currentRow >= Math.ceil(product.images.length / thumbnailsPerRow) - 1}
                  >
                    Next Photos
                  </button>
                </div>
                <div className="d-flex mt-2">
                  {product.images
                    .slice(currentRow * thumbnailsPerRow, (currentRow + 1) * thumbnailsPerRow)
                    .map((image, index) => {
                      const globalIndex = currentRow * thumbnailsPerRow + index;
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
            )}
          </div>

          <div className={`col-md-6 ${styles.productDetails}`}>
            <h2 className={styles.productTitle}>{product.name}</h2>
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
                {error ? (
                  <small className="text-danger">{error}</small>
                ) : (
                  <small className="form-text text-muted">
                    You can place order up to {product.stock}.
                  </small>
                )}
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

            <div className="mt-5">
              <p>
                <strong>Shipment Cost:</strong> {product.shipping_cost}
              </p>
              <p>
                <strong>Shipment Time:</strong> {product.delivery_time}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`container mt-5 ${styles.productContainer}`}>
        <div className={`mt-1 ${styles.aboutProduct}`}>
          <h2>About Product</h2>
          {product.description && (
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          )}
          {product.category && (
            <p>
              <strong>Category:</strong> {product.category.name}
            </p>
          )}
          {product.createdAt && (
            <p>
              <strong>Listed on:</strong> {new Date(product.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
