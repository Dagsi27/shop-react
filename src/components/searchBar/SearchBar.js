import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

const SearchBar = ({ data }) => {
  const [query, setQuery] = useState(""); // Wprowadzone zapytanie
  const [filteredResults, setFilteredResults] = useState([]); // Wyniki filtrowania
  const [isFocused, setIsFocused] = useState(false); // Flaga wskazująca, czy pole jest w fokusie
  const searchBarRef = useRef(null); // Referencja dla całego kontenera

  // Filtrowanie danych na podstawie wprowadzonego tekstu
  const filterResults = (input) => {
    if (input.trim() !== "") {
      const results = data.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      // Jeśli nic nie wpisano, pokaż pierwsze dostępne wyniki
      setFilteredResults(data.slice(0, 5)); // Pokaż 5 pierwszych wyników
    }
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    filterResults(input);
  };

  // Funkcje do obsługi focusa
  const handleFocus = () => {
    setIsFocused(true);
    filterResults(query); // Pokaż pierwsze wyniki, jeśli nie ma tekstu
  };

  const handleBlur = () => {
    // Logikę zamykania wyniku przenosimy do obsługi kliknięcia poza element
    if (query.trim() === "") {
      setFilteredResults([]);
    }
  };

  // Zamknięcie wyników, jeśli kliknięto poza wyszukiwarkę
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsFocused(false); // Ukryj wyniki
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Jeśli pole jest puste i mamy focus, pokaż 5 pierwszych wyników
    if (isFocused && query.trim() === "") {
      setFilteredResults(data.slice(0, 5));
    }
  }, [isFocused, query, data]);

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <form className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus} // Kiedy pole dostaje focus
          onBlur={handleBlur} // Kiedy pole traci focus
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={(e) => e.preventDefault()}
        >
          <i className="bi bi-search"></i>
        </button>
      </form>

      {/* Wyniki wyszukiwania */}
      {isFocused && (
        <div className={`search-results ${filteredResults.length > 0 || query.trim() !== "" ? "open" : ""}`}>
          {/* Jeśli wyniki są, wyświetl je */}
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div key={index} className="search-result-item">
                {result}
              </div>
            ))
          ) : (
            // Jeśli brak wyników i pole nie jest puste, wyświetl komunikat
            query.trim() !== "" && <div className="search-result-item">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
