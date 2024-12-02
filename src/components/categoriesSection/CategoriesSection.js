import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";

const CategoriesList = ({ categories }) => {
  const [startIndex, setStartIndex] = useState(0); // Index do śledzenia widocznych kategorii
  const visibleCategories = 12; // Liczba widocznych kategorii (6x2)

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleCategories >= categories.length
        ? 0
        : prevIndex + visibleCategories
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleCategories < 0
        ? Math.max(categories.length - visibleCategories, 0)
        : prevIndex - visibleCategories
    );
  };

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
        {categories
          .slice(startIndex, startIndex + visibleCategories)
          .concat(
            startIndex + visibleCategories > categories.length
              ? categories.slice(0, (startIndex + visibleCategories) % categories.length)
              : []
          )
          .map((category, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <Link
                to={`/product/${category.id}`}
                className="text-decoration-none"
              >
                <div className="ratio-container rounded-1 border border-light">
                  <img
                    src={`https://via.placeholder.com/300x225?text=${category.name}`}
                    className="img-fluid rounded-1"
                    alt={category.name}
                  />
                </div>
                <p className="mt-2">{category.name}</p>
              </Link>

            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesList;
