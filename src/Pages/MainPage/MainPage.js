import { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import CatgoriesSection from "../../components/categoriesSection/CategoriesSection";
import { useUser } from "../../context/UserContext";
import { useApiJson } from "../../config/api";

export default function MainPage() {
  useWebsiteTitle("Strona główna");
  const navigate = useNavigate();
  const { token, user } = useUser();
  const apiInstance = useApiJson();

  // Stan dla kategorii, produktów, ładowania i błędów
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sprawdź czy użytkownik jest zalogowany
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Pobierz kategorie z API używając tokena
  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/categories?limit=50&page=1");
      console.log("Fetched Categories:", response.data.data || []);
      setCategories(response.data.data || []); 
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Pobierz produkty z API używając tokena
  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get("/products");
      console.log("Fetched Products:", response.data.data || []);
      setProducts(response.data.data || []); 
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchProducts();
    }
  }, [token]); // Uruchom ponownie gdy token się zmieni

  if (isLoading) {
    return <div>Loading categories and products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={styles.mainPageContainer}>
      {/* Główna zawartość */}
      <div className={`d-flex justify-content-between ${styles.mainContent}`}>
        {/* Slider */}
        <div
          className={`carousel slide ${styles.mainSlider}`}
          id="mainSlider"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          {/* Wskaźniki slidera */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#mainSlider"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#mainSlider"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#mainSlider"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#mainSlider"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>

          {/* Obrazy slidera */}
          <div className={`carousel-inner ${styles.carouselInner}`}>
            <div className={`carousel-item active ${styles.carouselItemOverlay}`}>
              <img
                src="https://images.unsplash.com/photo-1683183193480-bda1292dd5ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className={`d-block w-100 ${styles.itemImage}`}
                alt="Slide 1"
              />
              <div
                className={`carousel-caption d-flex flex-column align-items-start text-start ${styles.carouselCaption}`}
              >
                <h2 className={styles.captionText}>Amazing Discounts</h2>
                <p className={`${styles.captionText} ms-auto text-end`}>
                  Buy yourself a favor
                </p>
                <button className={styles.shopButton}>Shop Now</button>
              </div>
            </div>
            <div className={`carousel-item ${styles.carouselItemOverlay}`}>
              <img
                src="https://images.unsplash.com/photo-1606422699425-f7122890005f?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className={`d-block w-100 ${styles.itemImage}`}
                alt="Slide 2"
              />
              <div
                className={`carousel-caption d-flex flex-column align-items-start text-start ${styles.carouselCaption}`}
              >
                <h2 className={styles.captionText}>Great Offers</h2>
                <p className={`${styles.captionText} ms-auto text-end`}>
                  Take advantage of amazing deals
                </p>
                <button className={styles.shopButton}>Shop Now</button>
              </div>
            </div>
            <div className={`carousel-item ${styles.carouselItemOverlay}`}>
              <img
                src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className={`d-block w-100 ${styles.itemImage}`}
                alt="Slide 3"
              />
              <div
                className={`carousel-caption d-flex flex-column align-items-start text-start ${styles.carouselCaption}`}
              >
                <h2 className={styles.captionText}>Trending Now</h2>
                <p className={`${styles.captionText} ms-auto text-end`}>
                  Find what's popular today
                </p>
                <button className={styles.shopButton}>Shop Now</button>
              </div>
            </div>
          </div>

          {/* Strzałki slidera */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#mainSlider"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#mainSlider"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Sekcja kategorii specjalnych */}
        <div
          className={`row text-center d-flex justify-content-around ${styles.specialCategories}`}
        >
          <div className="col-2 col-md-4 col-lg-5">
            <Link to="/discounts" className="text-decoration-none">
              <div className={`${styles.categoryButton} ${styles.categoryRatio}`}>
                <img
                  src="https://images.unsplash.com/photo-1606422699425-f7122890005f?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className={styles.categoryImage}
                  alt="Discounts"
                />
                <button className={styles.categoryButtonText}>Discounts</button>
              </div>
            </Link>
          </div>
          <div className="col-2 col-md-4 col-lg-5">
            <Link to="/popular" className="text-decoration-none">
              <div className={`${styles.categoryButton} ${styles.categoryRatio}`}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className={styles.categoryImage}
                  alt="Popular"
                />
                <button className={styles.categoryButtonText}>Popular</button>
              </div>
            </Link>
          </div>

          {/* Sekcja wyszukiwania */}
          <SearchBar data={products} />
        </div>
      </div>

      {/* Sekcja kategorii */}
      <CatgoriesSection categories={categories} />
    </main>
  );
}