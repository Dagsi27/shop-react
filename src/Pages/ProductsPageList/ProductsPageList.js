import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ProductsPageList.module.css";

const ProductsPageList = () => {
  const products = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Produkt #${index + 1}`,
    price: 100 + index * 10,
    rating: (4 + Math.random()).toFixed(2),
    reviews: Math.floor(Math.random() * 100) + 10,
    bought: Math.floor(Math.random() * 1000),
    stock: Math.floor(Math.random() * 200) + 10,
    imageUrl: "https://via.placeholder.com/150",
  }));

  // Stany dla paginacji, sortowania i wyszukiwania
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [sortCriteria, setSortCriteria] = useState("price");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Funkcja do sortowania produktów
  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;

    switch (sortCriteria) {
      case "price":
        comparison = a.price - b.price;
        break;
      case "bought":
        comparison = a.bought - b.bought;
        break;
      case "stock":
        comparison = a.stock - b.stock;
        break;
      case "rating":
        comparison = a.rating - b.rating;
        break;
      default:
        comparison = 0;
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Filtrowanie produktów na podstawie wyszukiwania
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logika paginacji
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Funkcja do renderowania paginacji
  const renderPagination = () => (
    <nav aria-label="Product pagination">
      <ul className="pagination justify-content-center mt-3 mb-3">
        <li
          className={`page-item ${
            currentPage === 1 ? styles.disabled : ""
          } ${styles.pageItem}`}
        >
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Poprzednia
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${styles.pageItem} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? styles.disabled : ""
          } ${styles.pageItem}`}
        >
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Następna
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className={`container ${styles.productListContainer}`}>
      {/* Górny pasek opcji */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-light">Products Page List</h2>
        <div className="d-flex gap-2">
          {/* Wyszukiwanie */}
          <input
            type="text"
            className={`form-control w-auto ${styles.searchBar}`}
            placeholder="Wyszukaj produkt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sortowanie */}
          <select
            className={`form-select w-auto  ${styles.sortingBar}`}
            onChange={(e) => setSortCriteria(e.target.value)}
            value={sortCriteria}
          >
            <option value="price">Cena</option>
            <option value="bought">Sprzedaż</option>
            <option value="stock">Magazyn</option>
            <option value="rating">Ocena</option>
          </select>
          <select
            className={`form-select w-auto ${styles.sortingBar}`}
            onChange={(e) => setSortDirection(e.target.value)}
            value={sortDirection}
          >
            <option value="asc">Rosnąco</option>
            <option value="desc">Malejąco</option>
          </select>
        </div>
      </div>

      {/* Górna paginacja */}
      {renderPagination()}

      {/* Lista produktów */}
      <div className="row g-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className={`card ${styles.productCard} h-100`}>
              <img
                src={product.imageUrl}
                className={`card-img-top ${styles.productImage}`}
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text mb-1">
                  <strong>Cena: {product.price} zł</strong>
                </p>
                <div className="mb-2">
                  <span className="text-warning">&#9733;</span> {product.rating}{" "}
                  ({product.reviews} opinii)
                </div>
                <p className="text-muted small">Kupiono: {product.bought} razy</p>
                <p className="text-muted small">
                  Dostępne sztuki: {product.stock}
                </p>
                <button className="btn btn-warning mt-auto">
                  Dodaj do koszyka
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dolna paginacja */}
      {renderPagination()}
    </div>
  );
};

export default ProductsPageList;
