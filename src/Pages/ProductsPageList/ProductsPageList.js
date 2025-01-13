import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ProductsPageList.module.css";

const ProductsPageList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("price");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = 20;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category_id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setFilteredProducts(
        products.filter((product) => product.category?.id === parseInt(categoryId))
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, categoryId]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    switch (sortCriteria) {
      case "price":
        comparison = a.price - b.price;
        break;
      case "bought":
        comparison = a.soldQuantity - b.soldQuantity;
        break;
      case "stock":
        comparison = a.quantity - b.quantity;
        break;
      case "rating":
        comparison = parseFloat(a.rating || 0) - parseFloat(b.rating || 0);
        break;
      default:
        comparison = 0;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.max(
    Math.ceil(sortedProducts.length / itemsPerPage),
    1
  );

  const handleProductClick = (productId, event) => {
    // Check if the click was on the "Add to Cart" button
    if (!event.target.classList.contains('btn')) {
      navigate(`/product/${productId}`);
    }
  };

  const renderPagination = () => (
    <nav aria-label="Product pagination">
      <ul className="pagination justify-content-center mt-3 mb-3">
        <li
          className={`page-item ${
            currentPage === 1 || filteredProducts.length === 0
              ? styles.disabled
              : ""
          } ${styles.pageItem}`}
        >
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={filteredProducts.length === 0}
          >
            Poprzednia
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${styles.pageItem} ${
              currentPage === index + 1 || filteredProducts.length === 0
                ? styles.active
                : ""
            }`}
          >
            <button
              className={`page-link ${styles.pageLink}`}
              onClick={() => setCurrentPage(index + 1)}
              disabled={filteredProducts.length === 0}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages || filteredProducts.length === 0
              ? styles.disabled
              : ""
          } ${styles.pageItem}`}
        >
          <button
            className={`page-link ${styles.pageLink}`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={filteredProducts.length === 0}
          >
            Następna
          </button>
        </li>
      </ul>
    </nav>
  );

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`container ${styles.productListContainer}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-light">
          Products in {categoryId ? `Category ${categoryId}` : "All Categories"}
        </h2>
        <div className="d-flex gap-2">
          <input
            type="text"
            className={`form-control w-auto ${styles.searchBar}`}
            placeholder="Search product..."
            onChange={(e) =>
              e.target.value
                ? setFilteredProducts(
                    products.filter((product) =>
                      product.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  )
                : setFilteredProducts(products)
            }
          />
          <select
            className={`form-select w-auto ${styles.sortingBar}`}
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

      {renderPagination()}

      <div className="row g-4">
        {products.length === 0 ? (
          <div className="alert alert-warning w-100 text-center" role="alert">
            Brak produktów w tej kategorii.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="alert alert-info w-100 text-center" role="alert">
            Nic nie odpowiada Twojemu wyszukiwaniu.
          </div>
        ) : (
          currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="col-6 col-md-4 col-lg-3"
              onClick={(e) => handleProductClick(product.id, e)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`card ${styles.productCard} h-100`}>
                <img
                  src={product.imageUrl || '/placeholder-image.jpg'}
                  className={`card-img-top ${styles.productImage}`}
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text mb-1">
                    <strong>Cena: {product.price} zł</strong>
                  </p>
                  <p className="text-muted small">
                    Dostępne sztuki: {product.quantity}
                  </p>
                  <p className="text-muted small">
                    Kupiono: {product.soldQuantity} razy
                  </p>
                  <button 
                    className="btn btn-warning mt-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking the button
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {renderPagination()}
    </div>
  );
};

export default ProductsPageList;