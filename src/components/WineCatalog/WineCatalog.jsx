import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./WineCatalog.css";
import "./Product.css";
import "./SortProduct.css";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import ArgentinaFlag from "../../img/ico/flags/argentina.svg";
import AvstraliaFlag from "../../img/ico/flags/icon_australia.svg";
import AvstriaFlag from "../../img/ico/flags/icon_avstria.svg";
import BulgaryFlag from "../../img/ico/flags/icon_bolgary.svg";
import BrazilFlag from "../../img/ico/flags/icon_brazil.svg";
import GeorgiaFlag from "../../img/ico/flags/icon_georgia.svg";
import IzrailFlag from "../../img/ico/flags/icon_izrail.svg";
import SpainFlag from "../../img/ico/flags/icon_spain.svg";
import { useCart } from '../Context/CartContext.jsx';
import penfolds from "../../img/wine_Category/penfolds.png";
import Footer from "../Footer/Footer.jsx";

const WineCatalog = () => {
  const [collapsedSections, setCollapsedSections] = useState({
    color: false,
    price: false,
    alcohol: false,
    taste: false,
    country: false,
    producer: false,
    character: false,
    volume: false,
    food: false,
  });
  const [sortOption, setSortOption] = useState("За замовчуванням");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWines, setFilteredWines] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(50000);
  const totalPages = 103;
  const itemsPerPage = 12;
  const { addToCart } = useCart();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    color: [],
    alcohol: [],
    taste: [],
    country: [],
    producer: [],
    character: [],
    volume: [],
    food: [],
    priceRange: { min: 300, max: 38650 },
    showDiscounts: false,
  });

  const navigate = useNavigate();

  // Flag to prevent double execution
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = React.useRef(null);

  const handleAddToCarts = (product, quantity, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    // Prevent multiple executions in rapid succession
    if (isAddingToCart) {
      console.log('Already adding to cart, operation ignored');
      return;
    }

    setIsAddingToCart(true);
    console.log(`Adding to cart: ${product.name}, quantity: ${quantity}`);
    
    addToCart({
      id: product.id,
      name: product.name,
      type: product.type,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
    
    // Reset flag after a short delay
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleViewDetails = (product) => {
    // Переадресація на сторінку деталей товару
    navigate(`/product/${product.id}`);
    
    // Якщо ви хочете логувати або відстежувати цю взаємодію
    console.log(`Navigating to product: ${product.name}`);
    
    // Якщо ви використовуєте аналітику
    // analytics.trackEvent('product_view', { productId: product.id });
  };


  const renderArrow = (section) => {
    return (

      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 transition-transform duration-200 ${
          collapsedSections[section] ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  const toggleSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  const allWines = [
    {
      id: 1,
      name: "Penfolds Bin 60A",
      type: "Червоне вино",
      color: "Червоне",
      price: 19850,
      onSale: false,
      alcohol: "14%+",
      taste: "Сухе",
      country: "Австралія",
      producer: "Penfolds",
      character: "Глибоке",
      volume: "0.75 л",
      foodPairing: ["Дичина", "Баранина"],
      image: penfolds,
    },
    {
      id: 2,
      name: "Penfolds Bin 60A",
      type: "Червоне вино",
      color: "Червоне",
      price: 21500,
      onSale: true,
      alcohol: "14%+",
      taste: "Сухе",
      country: "Австралія",
      producer: "Penfolds",
      character: "Глибоке",
      volume: "0.75 л",
      foodPairing: ["Дичина", "Баранина"],
      image: penfolds,
    },
    {
      id: 3,
      name: "Penfolds Bin 60A",
      type: "Червоне вино",
      color: "Червоне",
      price: 18750,
      onSale: false,
      alcohol: "14%+",
      taste: "Сухе",
      country: "Австралія",
      producer: "Penfolds",
      character: "Глибоке",
      volume: "0.75 л",
      foodPairing: ["Дичина"],
      image: penfolds,
    },
    {
      id: 4,
      name: "Cloudy Bay",
      type: "Біле вино",
      color: "Біле",
      price: 2850,
      onSale: false,
      alcohol: "11-13%",
      taste: "Сухе",
      country: "Австралія",
      producer: "Cloudy Bay",
      character: "Квіткове",
      volume: "0.75 л",
      foodPairing: ["Біла риба (лосось, тунець тощо)"],
      image: penfolds,
    },
    {
      id: 5,
      name: "Lou Rosé",
      type: "Біле вино",
      color: "Біле",
      price: 1950,
      onSale: true,
      alcohol: "11-13%",
      taste: "Напівсухе",
      country: "Іспанія",
      producer: "Lou",
      character: "Легке",
      volume: "0.75 л",
      foodPairing: ["Аперитив"],
      image: penfolds,
    },
    {
      id: 6,
      name: "Penfolds Bin 60A",
      type: "Біле вино",
      color: "Біле",
      price: 3250,
      onSale: false,
      alcohol: "11-13%",
      taste: "Сухе",
      country: "Австралія",
      producer: "Penfolds",
      character: "Елегантне",
      volume: "0.75 л",
      foodPairing: ["Біла риба (лосось, тунець тощо)"],
      image: penfolds,
    },
    {
      id: 7,
      name: "Villa Maria",
      type: "Біле вино",
      color: "Біле",
      price: 1650,
      onSale: false,
      alcohol: "11-13%",
      taste: "Сухе",
      country: "Аргентина",
      producer: "Villa Maria",
      character: "Легке",
      volume: "0.75 л",
      foodPairing: ["Вегетаріанські"],
      image: penfolds,
    },
    {
      id: 8,
      name: "Domaine Desvignes",
      type: "Біле вино",
      color: "Біле",
      price: 2950,
      onSale: true,
      alcohol: "11-13%",
      taste: "Сухе",
      country: "Франція",
      producer: "Domaine Desvignes",
      character: "Квіткове",
      volume: "0.75 л",
      foodPairing: ["Аперитив"],
      image: penfolds,
    },
    {
      id: 9,
      name: "Whispering Angel",
      type: "Рожеве вино",
      color: "Рожеве",
      price: 2450,
      onSale: false,
      alcohol: "11-13%",
      taste: "Сухе",
      country: "Франція",
      producer: "Whispering Angel",
      character: "Легке",
      volume: "0.75 л",
      foodPairing: ["Аперитив"],
      image: penfolds,
    },
  ];

  const colorCategories = [
    "Червоне",
    "Біле",
    "Рожеве",
    "Помаранчеве",
    "Ігристе",
    "Десертне",
  ];

  const alcoholCategories = ["5-7%", "8-10%", "11-13%", "14%+"];
  const tasteCategories = ["Сухе", "Напівсухе", "Напівсолодке", "Солодке"];
  const countryCategories = [
    { name: "Аргентина", flagSrc: ArgentinaFlag },
    { name: "Австралія", flagSrc: AvstraliaFlag },
    { name: "Австрія", flagSrc: AvstriaFlag },
    { name: "Болгарія", flagSrc: BulgaryFlag },
    { name: "Бразилія", flagSrc: BrazilFlag },
    { name: "Грузія", flagSrc: GeorgiaFlag },
    { name: "Ізраїль", flagSrc: IzrailFlag },
    { name: "Іспанія", flagSrc: SpainFlag },
    { name: "Італія", flagSrc: IzrailFlag }, //
    { name: "Франція", flagSrc: IzrailFlag }, //
  ];
  const producerCategories = [
    "Antinori",
    "Almaviva",
    "Achaval-Ferrer",
    "Beringer",
    "Baron Philippe de Rothschild",
    "Bodega Catena Zapata",
    "Bollinger",
    "Château Margaux",
    "Cloudy Bay",
    "Domaine Desvignes",
    "Ferrari",
    "Lou",
    "MASI",
    "Minuty",
    "Penfolds",
    "Villa Maria",
    "Whispering Angel",
  ];
  const characterCategories = [
    "Гармонійне",
    "Глибоке",
    "Живе",
    "Землисте",
    "Екзотичне",
    "Елегантне",
    "Квіткове",
    "Легке",
    "Медове",
  ];
  const volumeCategories = ["0.375 л", "0.75 л", "1.5 л", "3 л"];
  const foodCategories = [
    "Аперитив",
    "Біла риба (лосось, тунець тощо)",
    "Баранина",
    "Вегетаріанські",
    "Випічка и мед",
    "Гостра їжа",
    "Гриби",
    "Дичина",
  ];

  const [searchCountry, setSearchCountry] = useState("");
  const [searchProducer, setSearchProducer] = useState("");

  const formatPrice = (price) => {
    return parseInt(price);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (filterType === "priceRange") {
        updatedFilters.priceRange = { ...updatedFilters.priceRange, ...value };
      } else if (filterType === "showDiscounts") {
        updatedFilters.showDiscounts = value;
      } else {
        if (updatedFilters[filterType].includes(value)) {
          updatedFilters[filterType] = updatedFilters[filterType].filter(
            (item) => item !== value
          );
        } else {
          updatedFilters[filterType] = [...updatedFilters[filterType], value];
        }
      }

      return updatedFilters;
    });
  };

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: {
        ...prevFilters.priceRange,
        [type]: numValue,
      },
    }));
  };

  const resetAllFilters = () => {
    setFilters({
      color: [],
      alcohol: [],
      taste: [],
      country: [],
      producer: [],
      character: [],
      volume: [],
      food: [],
      priceRange: { min: 500, max: 38650 },
      showDiscounts: false,
    });
    setSearchCountry("");
    setSearchProducer("");
  };

  const applyFilters = () => {
    let result = [...allWines];

    if (filters.color.length > 0) {
      result = result.filter((wine) => filters.color.includes(wine.color));
    }

    result = result.filter(
      (wine) =>
        wine.price >= filters.priceRange.min &&
        wine.price <= filters.priceRange.max
    );

    if (filters.showDiscounts) {
      result = result.filter((wine) => wine.onSale);
    }

    if (filters.alcohol.length > 0) {
      result = result.filter((wine) => filters.alcohol.includes(wine.alcohol));
    }

    if (filters.taste.length > 0) {
      result = result.filter((wine) => filters.taste.includes(wine.taste));
    }

    if (filters.country.length > 0) {
      result = result.filter((wine) => filters.country.includes(wine.country));
    }

    if (filters.producer.length > 0) {
      result = result.filter((wine) =>
        filters.producer.includes(wine.producer)
      );
    }

    if (filters.character.length > 0) {
      result = result.filter((wine) =>
        filters.character.includes(wine.character)
      );
    }

    if (filters.volume.length > 0) {
      result = result.filter((wine) => filters.volume.includes(wine.volume));
    }

    if (filters.food.length > 0) {
      result = result.filter((wine) => {
        return wine.foodPairing.some((food) => filters.food.includes(food));
      });
    }

    result = sortWines(result, sortOption);

    setFilteredWines(result);
    setTotalItems(result.length);

    setCurrentPage(1);
  };

  const sortWines = (wines, option) => {
    const sortedWines = [...wines];

    switch (option) {
      case "За замовчуванням":
        return sortedWines.sort((a, b) => a.name.localeCompare(b.name));
      case "За популярністю":
        return sortedWines.sort((a, b) => b.name.localeCompare(a.name));
      case "За збільшенням ціни":
        return sortedWines.sort((a, b) => a.price - b.price);
      case "За зменшенням ціни":
        return sortedWines.sort((a, b) => b.price - a.price);
      default:
        return sortedWines; // За замовчуванням
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [sortOption]);

  // Додаємо новий useEffect для автоматичного застосування фільтрів
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const getCurrentPageWines = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredWines.slice(startIndex, endIndex);
  };

  const getFilteredCountries = () => {
    if (!searchCountry) return countryCategories;
    return countryCategories.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
  };

  const getFilteredProducers = () => {
    if (!searchProducer) return producerCategories;
    return producerCategories.filter((producer) =>
      producer.toLowerCase().includes(searchProducer.toLowerCase())
    );
  };

  const FilterSection = ({
    title,
    section,
    categories,
    filterType,
    hasSearch,
    searchValue,
    onSearchChange,
    renderItem,
  }) => (
    <div className="filter-section">
      <div
        className="flex justify-between items-center mb-2 cursor-pointer filter-header"
        onClick={() => toggleSection(section)}
      >
        <h4 className="filter-title">{title}</h4>
        <button className="category-collapse-button">
          {renderArrow(section)}
        </button>
      </div>
      {!collapsedSections[section] && (
        <div className="filter-options">
          {hasSearch && (
            <div className="filter-search">
              <input
                type="text"
                placeholder={`Пошук ${title.toLowerCase()}`}
                className="filter-search-input"
                value={searchValue}
                onChange={onSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {categories.map((category, index) => {
            const categoryValue = typeof category === "object" ? category.name : category;
            return (
              <label key={`${section}-${index}`} className="filter-option">
                <input
                  type="checkbox"
                  className="filter-checkbox"
                  checked={filters[filterType].includes(categoryValue)}
                  onChange={() => handleFilterChange(filterType, categoryValue)}
                />
                <span>
                  {renderItem ? renderItem(category) : category}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  const handleSliderMouseDown = (e, handle) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleSliderMouseUp = () => {
    setIsDragging(null);
  };

  const handleSliderMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
    
    const min = 300;
    const max = maxPriceValue;
    const value = Math.round(min + percentage * (max - min));
    
    if (isDragging === 'left') {
      if (value < filters.priceRange.max) {
        handlePriceChange('min', value);
      }
    } else if (isDragging === 'right') {
      if (value > filters.priceRange.min) {
        handlePriceChange('max', value);
      }
    }
  };

  // Add event listeners for drag outside the element
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleSliderMouseMove);
      window.addEventListener('mouseup', handleSliderMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleSliderMouseMove);
      window.removeEventListener('mouseup', handleSliderMouseUp);
    };
  }, [isDragging, filters.priceRange]);

  return (
    <div className="wine-catalog-wrapper">
      <div className="wine-catalog-content">
        <div className="custom-bg relative overflow-hidden">
          <Breadcrumbs />
          <div className="banner-overlay">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="banner-content">
                <h1 className="head-title-catalog">ІСКРИСТА МАГІЯ</h1>
                <h2 className="head-subtitle-catalog">ВІД КЛАСИКИ ДО СМІЛИВИХ НОВИНОК</h2>
                <button className="button-catalog-more">ДІЗНАТИСЬ БІЛЬШЕ</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="catalog-container">
            <div className="container mx-auto px-4 py-8">
              <div className="catalog-header">
                <h2 className="tittle-catalog">КАТАЛОГ</h2>
                <p className="product-count">{totalItems} Товарів</p>
              </div>

              <button 
                className="mobile-filters-button"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                {isMobileFiltersOpen ? "Сховати фільтри" : "Показати фільтри"}
              </button>

              <div className="catalog-content">
                {/* Ліва колонка з фільтрами */}
                <div className={`filter-column ${isMobileFiltersOpen ? 'mobile-open' : ''}`}>
                  <h3 className="text-filter-title">Фільтри</h3>

                  <FilterSection
                    title="Тип вина"
                    section="color"
                    categories={colorCategories}
                    filterType="color"
                  />

                  <div className="filter-section">
                    <div
                      className="flex justify-between items-center mb-2 cursor-pointer filter-header"
                      onClick={() => toggleSection("price")}
                    >
                      <h4 className="filter-title">Ціна</h4>
                      <button className="category-collapse-button">
                        {renderArrow("price")}
                      </button>
                    </div>
                    {!collapsedSections.price && (
                      <div className="filter-options">
                        <div className="price-filter-range">
                          <div className="price-slider-container">
                            <div className="price-slider" ref={sliderRef}>
                              <div 
                                className="price-slider-track"
                                style={{
                                  left: `${((filters.priceRange.min - 300) / (maxPriceValue - 300)) * 100}%`,
                                  width: `${((filters.priceRange.max - filters.priceRange.min) / (maxPriceValue - 300)) * 100}%`
                                }}
                              ></div>
                              <div 
                                className="price-slider-handle left"
                                onMouseDown={(e) => handleSliderMouseDown(e, 'left')}
                                style={{
                                  left: `${((filters.priceRange.min - 300) / (maxPriceValue - 300)) * 100}%`
                                }}
                              ></div>
                              <div 
                                className="price-slider-handle right"
                                onMouseDown={(e) => handleSliderMouseDown(e, 'right')}
                                style={{
                                  left: `${((filters.priceRange.max - 300) / (maxPriceValue - 300)) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="price-inputs-container">
                            <div className="price-input-group">
                              <label className="price-label">ВІД</label>
                              <input
                                type="number"
                                className="price-input"
                                value={filters.priceRange.min}
                                onChange={(e) => handlePriceChange("min", e.target.value)}
                                min="0"
                              />
                              <span className="currency">₴</span>
                            </div>
                            <div className="price-input-group">
                              <label className="price-label">ДО</label>
                              <input
                                type="number"
                                className="price-input"
                                value={filters.priceRange.max}
                                onChange={(e) => handlePriceChange("max", e.target.value)}
                                max={maxPriceValue}
                              />
                              <span className="currency">₴</span>
                            </div>
                          </div>
                          <label className="filter-option">
                            <input
                              type="checkbox"
                              className="filter-checkbox"
                              checked={filters.showDiscounts}
                              onChange={() => handleFilterChange("showDiscounts", !filters.showDiscounts)}
                            />
                            <span>Показати тільки знижки</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <FilterSection
                    title="Вміст алкоголю"
                    section="alcohol"
                    categories={alcoholCategories}
                    filterType="alcohol"
                  />

                  <FilterSection
                    title="Смак"
                    section="taste"
                    categories={tasteCategories}
                    filterType="taste"
                  />

                  <FilterSection
                    title="Країна"
                    section="country"
                    categories={getFilteredCountries()}
                    filterType="country"
                    hasSearch={true}
                    searchValue={searchCountry}
                    onSearchChange={(e) => setSearchCountry(e.target.value)}
                    renderItem={(category) => (
                      <>
                        <img
                          src={category.flagSrc}
                          alt={`Прапор ${category.name}`}
                          className="inline-block mr-2 w-5 h-3"
                        />
                        {category.name}
                      </>
                    )}
                  />

                  <FilterSection
                    title="Виробник"
                    section="producer"
                    categories={getFilteredProducers()}
                    filterType="producer"
                    hasSearch={true}
                    searchValue={searchProducer}
                    onSearchChange={(e) => setSearchProducer(e.target.value)}
                  />

                  <FilterSection
                    title="Характер"
                    section="character"
                    categories={characterCategories}
                    filterType="character"
                  />

                  <FilterSection
                    title="Об'єм"
                    section="volume"
                    categories={volumeCategories}
                    filterType="volume"
                  />

                  <FilterSection
                    title="Поєднання з їжею"
                    section="food"
                    categories={foodCategories}
                    filterType="food"
                  />

                  {/* Кнопки керування фільтрами */}
                  <div className="filter-actions mt-6">
                    <button
                      className="filter-button filter-reset w-full"
                      onClick={resetAllFilters}
                    >
                      Скинути фільтри
                    </button>
                    <button
                      className="filter-button filter-apply-mobile w-full mt-2"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      Показати товари
                    </button>
                  </div>
                </div>

                {/* Права колонка з товарами */}
                <div className="w-full lg:w-3/4 products-column">
                  <div className="sort-container">
                    <div className="sort-wrapper">
                      <label className="sort-label">Сортувати:</label>
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="sort-select"
                      >
                        <option value="За замовчуванням">За замовчуванням</option>
                        <option value="За популярністю">За популярністю</option>
                        <option value="За збільшенням ціни">За збільшенням ціни</option>
                        <option value="За зменшенням ціни">За зменшенням ціни</option>
                      </select>
                    </div>
                  </div>
                 {/* Сітка продуктів */}
                 <div className="products-grid-container">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWines.length > 0 ? (
                      getCurrentPageWines().map((wine) => (
                        <div key={wine.id} className="wine-card">
                          <div 
                            className="wine-card-content cursor-pointer" 
                            onClick={() => navigate(`/product/${wine.id}`)}
                          >
                            {wine.onSale && <div className="sale-badge">Знижка</div>}
                            <div className="wine-image">
                              <img src={wine.image} alt={wine.name} />
                            </div>
                            <div className="wine-details">
                              <h3 className="wine-name">{wine.name}</h3>
                              <p className="wine-type">{wine.type}</p>
                              <div className="wine-price">
                                <span className="font-bold">
                                  {formatPrice(wine.price)} ₴
                                </span>
                              </div>
                            </div>
                          </div>
                          <button 
                            className="add-to-cart"
                            onClick={function cartButtonHandler(e) {
                              e.stopPropagation(); 
                              e.preventDefault();
                              // Use direct function to prevent potential double execution
                              handleAddToCarts(wine, 1, e);
                            }}
                          >
                            До кошика
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="no-products-message">
                        <p>За вашим запитом товарів не знайдено.</p>
                        <p>Спробуйте змінити параметри фільтра.</p>
                      </div>
                    )}
                  </div>
                 </div>

                  {/* Пагінація */}
                  {filteredWines.length > 0 && (
                    <div className="pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-arrow"
                      >
                        ПОПЕРЕДНЯ
                      </button>
                      <div className="pagination-center">
                        <span>Сторінка:</span>
                        <div className="pagination-select-wrapper">
                          <select
                            value={currentPage}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value >= 1 && value <= totalPages) {
                                handlePageChange(value);
                              }
                            }}
                            className="pagination-select"
                          >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                              <option key={page} value={page}>{page}</option>
                            ))}
                          </select>
                          <div className="pagination-select-arrow"></div>
                        </div>
                        <span>з {totalPages}</span>
                      </div>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-arrow"
                      >
                        НАСТУПНА
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WineCatalog;
