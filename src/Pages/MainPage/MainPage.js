import "./MainPage.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import CatgoriesSection from "../../components/categoriesSection/CategoriesSection";
import { useData } from "../../hooks/useData";
import productData from "../../Data/products.json"; // Import danych JSON

export default function MainPage() {
  useWebsiteTitle("Strona główna");
  
 //dane testowe 
  const test = productData
  
  const data = useData(); // Pobierz dane z kontekstu

  const categories = data
    ? [...new Set(test.map(product => product.name))] // Wyodrębnij unikalne nazwy kategorii
    : [];

  return (
    <main className="container mt-4">
      <div className="mainContainer row d-flex justify-content-between">
        {/* Carousel */}
        <div className="carousel slide" id="mainSlider" data-bs-ride="carousel" data-bs-interval="3000">
  {/* Wskaźniki */}
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

  {/* Slider Images */}
  <div className="carousel-inner">
  <div className="carousel-item active">
    <img
      src="https://images.unsplash.com/photo-1683183193480-bda1292dd5ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="d-block w-100 item-image"
      alt="Slide 1"
    />
    <div className="carousel-caption d-flex flex-column align-items-start text-start">
      <h2 className="caption-text">Amazing Discounts</h2>
      <p className="caption-text ms-auto text-end carouselText">
        Buy yourself a favor
      </p>
      <button className="shop-button">Shop Now</button>
    </div>
  </div>

  <div className="carousel-item">
    <img
      src="https://images.unsplash.com/photo-1606422699425-f7122890005f?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="d-block w-100 item-image"
      alt="Slide 2"
    />
    <div className="carousel-caption d-flex flex-column align-items-start text-start">
      <h2 className="caption-text">Great Offers</h2>
      <p className="caption-text ms-auto text-end carouselText">
        Take advantage of amazing deals
      </p>
      <button className="shop-button">Shop Now</button>
    </div>
  </div>

  <div className="carousel-item">
    <img
      src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="d-block w-100 item-image"
      alt="Slide 3"
    />
    <div className="carousel-caption d-flex flex-column align-items-start text-start">
      <h2 className="caption-text">Trending Now</h2>
      <p className="caption-text ms-auto text-end carouselText">
        Find what's popular today
      </p>
      <button className="shop-button">Shop Now</button>
    </div>
  </div>

  <div className="carousel-item">
    <img
      src="https://images.unsplash.com/photo-1683183193480-bda1292dd5ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="d-block w-100 item-image"
      alt="Slide 4"
    />
    <div className="carousel-caption d-flex flex-column align-items-start text-start">
      <h2 className="caption-text">Exclusive Deals</h2>
      <p className="caption-text ms-auto text-end carouselText">
        Grab your offer before it's gone!
      </p>
      <button className="shop-button">Shop Now</button>
    </div>
  </div>
</div>


  {/* Strzałki - nawigacja */}
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#mainSlider"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#mainSlider"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


        {/* Special categories */}
        <div
          className="row text-center d-flex justify-content-around"
          id="specialCategories"
        >
          <div className="col-2 col-md-4 col-lg-5">
            <Link to="/discounts" className="text-decoration-none">
              <div className="button-style ratio">
                <img
                  src="https://images.unsplash.com/photo-1606422699425-f7122890005f?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="sc-img"
                  alt="Discounts"
                />
                <button className="button-text">Discounts</button>
              </div>
            </Link>
          </div>

          <div className="col-2 col-md-4 col-lg-5">
            <Link to="/popular" className="text-center">
              <div className="button-style ratio">
                <img
                  src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="sc-img"
                  alt="Popular"
                />
                <button className="button-text">Popular</button>
              </div>
            </Link>
          </div>

          {/* Search Section */}
          <SearchBar data={categories} />
        </div>
      </div>

      {/* Categories Section */}
      <CatgoriesSection categories={categories} />
      <CatgoriesSection categories={categories} />
      <CatgoriesSection categories={categories} />
    </main>
  );
}
