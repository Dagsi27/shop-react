import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useApiJson } from "../../config/api";
import "./CategoriesSection.css";

const CategoriesList = ({ categories = [] }) => {
  const { token } = useUser();
  const navigate = useNavigate();
  const apiInstance = useApiJson();
  
  const [localCategories, setLocalCategories] = useState(categories);
  const [startIndex, setStartIndex] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const visibleCategories = 12; // Liczba widocznych kategorii (6x2)

  // Fetch categories if not provided via props
  useEffect(() => {
    if (categories.length === 0 && token) {
      fetchCategories();
    } else {
      setLocalCategories(categories);
    }
  }, [categories, token]);

  // Fetch categories using the authentication token
  const fetchCategories = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiInstance.get("/categories?limit=50&page=1");
      setLocalCategories(response.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleCategories >= localCategories.length
        ? 0
        : prevIndex + visibleCategories
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleCategories < 0
        ? Math.max(localCategories.length - visibleCategories, 0)
        : prevIndex - visibleCategories
    );
  };

  if (isLoading) {
    return <div className="text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <section className="categories-section mt-5">
      <h3 className="text-center">Shop by Categories</h3>
      <div className="navigation text-center mb-3">
        <button
          className="btn btn-primary mx-2 btn-dark"
          onClick={handlePrev}
        >
          &lt; Prev
        </button>
        <button
          className="btn btn-primary mx-2 btn-dark"
          onClick={handleNext}
        >
          Next &gt;
        </button>
      </div>
      <div className="row text-center">
        {localCategories.length === 0 ? (
          <div className="col-12 text-center">No categories available</div>
        ) : (
          localCategories
            .slice(startIndex, startIndex + visibleCategories)
            .concat(
              startIndex + visibleCategories > localCategories.length
                ? localCategories.slice(0, (startIndex + visibleCategories) % localCategories.length)
                : []
            )
            .map((category, index) => (
              <div key={category.id || index} className="col-6 col-md-4 col-lg-2 mb-4">
                <Link
                  to={`/products?category_id=${category.id}`}
                  className="text-decoration-none"
                >
                  <div className="ratio-container rounded-1 border border-light">
                    <img
                      src={category.image || `https://via.placeholder.com/300x225?text=${category.name}`}
                      className="img-fluid rounded-1"
                      alt={category.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/300x225?text=${category.name}`;
                      }}
                    />
                  </div>
                  <p className="mt-2">{category.name}</p>
                </Link>
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default CategoriesList;