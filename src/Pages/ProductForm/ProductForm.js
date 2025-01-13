// ProductForm.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    selectedCategories: [],
    description: '',
    condition: 'new',
    images: Array(8).fill(null),
    contactEmail: '',
    contactPhone: '',
    location: ''
  });

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        // Sprawdzamy czy mamy dostęp do data w odpowiedzi
          setCategories(response.data.data);
          setFilteredCategories(response.data.data);
      } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
        setCategories([]);
        setFilteredCategories([]);
      }
    };
    fetchCategories();
  }, []);
  const formatPrice = (value) => {
    // Usuń wszystkie znaki oprócz cyfr i kropki
    const cleaned = value.replace(/[^\d.]/g, '');
    
    // Sprawdź czy jest więcej niż jedna kropka
    const dots = cleaned.split('.').length - 1;
    if (dots > 1) return formData.price;

    // Jeśli są cyfry po kropce, ogranicz do 2
    if (cleaned.includes('.')) {
      const [whole, decimal] = cleaned.split('.');
      return `${whole}.${decimal.slice(0, 2)}`;
    }

    return cleaned;
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const formattedPrice = formatPrice(rawValue);
    
    // Konwertuj na liczbę do walidacji
    const numericValue = parseFloat(formattedPrice);

    if (formattedPrice !== '') {
      if (numericValue > 10000000) {
        setErrors(prev => ({
          ...prev,
          price: 'Maksymalna cena to 10,000,000.00 PLN'
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      price: formattedPrice
    }));

    // Wyczyść błąd jeśli wartość jest poprawna
    if (errors.price) {
      setErrors(prev => ({
        ...prev,
        price: ''
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price') return;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowCategoryDropdown(true);
    
    if (!Array.isArray(categories)) {
      console.error('Categories is not an array:', categories);
      return;
    }
    
    const filtered = categories.filter(category => 
      category?.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };
  

  const handleCategorySelect = (category) => {
    if (!formData.selectedCategories.find(cat => cat.id === category.id)) {
      setFormData(prev => ({
        ...prev,
        selectedCategories: [...prev.selectedCategories, category]
      }));
      if (errors.categories) {
        setErrors(prev => ({
          ...prev,
          categories: ''
        }));
      }
    }
    setShowCategoryDropdown(false);
    setSearchTerm('');
  };

  const handleRemoveCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.filter(cat => cat.id !== categoryId)
    }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors(prev => ({
          ...prev,
          images: 'Plik jest zbyt duży. Maksymalny rozmiar to 5MB.'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...formData.images];
        newImages[index] = reader.result;
        setFormData(prev => ({
          ...prev,
          images: newImages
        }));
        if (errors.images) {
          setErrors(prev => ({
            ...prev,
            images: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages[index] = null;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
    }

    // Walidacja ceny
    if (!formData.price) {
      newErrors.price = 'Cena jest wymagana';
    } else {
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        newErrors.price = 'Wprowadź prawidłową cenę większą niż 0';
      } else if (priceValue > 10000000) {
        newErrors.price = 'Maksymalna cena to 10,000,000.00 PLN';
      }
    }

    if (formData.selectedCategories.length === 0) {
      newErrors.categories = 'Wybierz przynajmniej jedną kategorię';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Opis jest wymagany';
    }

    if (!formData.images.some(img => img !== null)) {
      newErrors.images = 'Dodaj przynajmniej jedno zdjęcie';
    }

    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Podaj prawidłowy adres email';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokalizacja jest wymagana';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Dane formularza:', formData);
      // const response = await axios.post('/api/advertisements', formData);
    } catch (error) {
      console.error('Błąd podczas wysyłania formularza:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.'
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Dodaj nowe ogłoszenie</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Tytuł */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Tytuł ogłoszenia</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="Wpisz tytuł ogłoszenia"
          />
          {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
        </div>

        {/* Cena */}
        <div className={styles.formGroup}>
          <label htmlFor="price">Cena (PLN)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
            placeholder="0.00"
          />
          {errors.price && <span className={styles.errorMessage}>{errors.price}</span>}
        </div>

        {/* Kategorie */}
        <div className={styles.formGroup}>
          <label>Kategorie</label>
          <div className={styles.categorySearchContainer}>
            <div className={styles.searchInputWrapper}>
              <i className="bi bi-search"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className={`${styles.input} ${errors.categories ? styles.inputError : ''}`}
                placeholder="Wyszukaj kategorię..."
              />
            </div>
            
            {showCategoryDropdown && searchTerm && (
              <div className={styles.categoryDropdown}>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map(category => (
                    <div
                      key={category.id}
                      className={styles.categoryOption}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </div>
                  ))
                ) : (
                  <div className={styles.noCategories}>
                    Nie znaleziono kategorii
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.selectedCategories}>
            {formData.selectedCategories.map(category => (
              <div key={category.id} className={styles.selectedCategory}>
                {category.name}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className={styles.removeCategory}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}
          </div>
          {errors.categories && <span className={styles.errorMessage}>{errors.categories}</span>}
        </div>

        {/* Stan produktu */}
        <div className={styles.formGroup}>
          <label>Stan produktu</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="condition"
                value="new"
                checked={formData.condition === 'new'}
                onChange={handleInputChange}
                className={styles.radioInput}
              />
              Nowy
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="condition"
                value="used"
                checked={formData.condition === 'used'}
                onChange={handleInputChange}
                className={styles.radioInput}
              />
              Używany
            </label>
          </div>
        </div>

        {/* Opis */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Opis produktu</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            placeholder="Opisz swój produkt"
            rows="5"
          />
          {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
        </div>

        {/* Zdjęcia */}
        <div className={styles.formGroup}>
          <label>Zdjęcia produktu (max. 8)</label>
          <div className={styles.imageGrid}>
            {formData.images.map((image, index) => (
              <div key={index} className={styles.imageUploadBox}>
                {image ? (
                  <div className={styles.imagePreviewContainer}>
                    <img src={image} alt={`Zdjęcie ${index + 1}`} className={styles.imagePreview} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className={styles.removeImage}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                ) : (
                  <label className={styles.imageUploadLabel}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className={styles.imageInput}
                    />
                    <div className={styles.uploadPlaceholder}>
                      <i className="bi bi-plus-lg"></i>
                      <span>Dodaj zdjęcie</span>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>
          {errors.images && <span className={styles.errorMessage}>{errors.images}</span>}
        </div>

        {/* Lokalizacja */}
        <div className={styles.formGroup}>
          <label htmlFor="location">Lokalizacja</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
            placeholder="Podaj lokalizację"
          />
          {errors.location && <span className={styles.errorMessage}>{errors.location}</span>}
        </div>

        {/* Dane kontaktowe */}
        <div className={styles.formGroup}>
          <label htmlFor="contactEmail">Email kontaktowy</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.contactEmail ? styles.inputError : ''}`}
            placeholder="twoj@email.com"
          />
          {errors.contactEmail && <span className={styles.errorMessage}>{errors.contactEmail}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactPhone">Telefon kontaktowy</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="123-456-789"
          />
        </div>

        {/* Przycisk submit */}
        <button type="submit" className={styles.submitButton}>
          <i className="bi bi-plus-circle"></i>
          Opublikuj ogłoszenie
        </button>

        {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      </form>
    </div>
  );
};

export default ProductForm;