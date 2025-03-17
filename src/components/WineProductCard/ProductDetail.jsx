import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
import ArgentinaFlag from "../../img/ico/flags/argentina.svg";
import Header from "../Header/Header";
import yalovich from "../../img/card/yalovich.png";
import baranina from "../../img/card/baranina.png";
import bird from "../../img/card/bird.png";

import first from "../../img/card/first.png";
import second from "../../img/card/second.png";
import thirth from "../../img/card/thirth.png";
import fourth from "../../img/card/fourth.png";
import Footer from "../Footer/Footer";

import new_bottle from "../../img/card/new_botlle.png";
import new_bottle1 from "../../img/card/new_botlle1.png";
import new_bottle2 from "../../img/card/new_botlle2.png";
import PaymentDelivery from "./Payment/PaymentDelivery.jsx";
import { useCart } from "../Context/CartContext.jsx";


// Import the PaymentDelivery component

const productData = {
  id: "HFY30171",
  name: "Santa Julia Reserva Malbec Valle de Uco",
  brand: "Santa Julia",
  type: "червоне",
  color: "Червоне",
  price: 480,
  onSale: false,
  alcohol: "14%",
  taste: "сухе",
  country: "Аргентина",
  countryFlag: ArgentinaFlag,
  character: "Глибоке",
  volume: "0.75 л",
  rating: 4.5,
  reviews: 68,
  foodPairing: ["Червоне м'ясо", "Дичина", "Тверді сири"],
  images: [first, second, thirth, fourth],
  description:
    "Колір рубіновий з фіолетовими відтінками. В ароматі відчуваються ноти стиглих лісових ягід, таких як ожина та чорниця, доповнені тонкими пряними нотками чорного перцю, паприки та трав'яними відтінками. Округлий, збалансований з м'якими танінами та живою кислотністю. Післясмак із інтенсивною присутністю темних фруктів та цитрусових. Santa Julia Reserva Malbec Valle de Uco краще подавати при температурі 16-18°C.",
  tasteProfile: {
    lightBold: 70,
    smoothTannic: 65,
    drySweet: 25,
    softAcidic: 60,
  },
};

const ProductDetail = () => {
const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Характеристики");

  // В реальному додатку ви б використовували це для завантаження продукту
  // const { productId } = useParams();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Створюємо продукт для додавання в кошик
    const productToAdd = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.images[0], // Перше зображення як основне
      quantity: quantity,
    };
  
    // Викликаємо функцію з контексту
    addToCart(productToAdd, quantity);
  
    // Можна додати повідомлення про успішне додавання, якщо потрібно
    console.log(`Додано ${quantity} пляшок ${productData.name} в кошик`);
  };

  const toggleFavorite = () => {
    console.log(`Додано/видалено з улюблених ${productData.name}`);
    // Реалізуйте тут логіку улюблених
  };

  // Function to render the appropriate content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Оплата і доставка":
        return <PaymentDelivery />;
      case "Відгуки":
        return (
          <div className="reviews-section">
            <p>Відгуки користувачів про цей товар будуть тут</p>
          </div>
        );
      case "Характеристики":
      default:
        return (
          <>
            {/* Опис продукту */}
            <div className="wine-description mb-12">
              <h2 className="text-description">ОПИС ВИНА</h2>
              <p>{productData.description}</p>

              <p className="mt-4">
                {" "}
                <br />
                Такий температурний діапазон дозволяє розкрити багаті аромати
                чорної смородини, вишні, шоколаду та дубових нот, зберігаючи
                баланс між фруктовістю та танінами.
              </p>
            </div>

            {/* Смаковий профіль */}
            <div className="taste-profile mb-12">
              <h3 className="text-taste">ЯКЕ НА СМАК ЦЕ ВИНО?</h3>

              <div className="taste-slider">
                <div className="taste-row">
                  <div className="taste-label">Легкий</div>
                  <div className="taste-bar">
                    <div
                      className="taste-value"
                      style={{
                        width: `${productData.tasteProfile.lightBold}%`,
                      }}
                    ></div>
                  </div>
                  <div className="taste-opposite">Насичений</div>
                </div>

                <div className="taste-row">
                  <div className="taste-label">Гладкий</div>
                  <div className="taste-bar">
                    <div
                      className="taste-value"
                      style={{
                        width: `${productData.tasteProfile.smoothTannic}%`,
                      }}
                    ></div>
                  </div>
                  <div className="taste-opposite">Танінновий</div>
                </div>

                <div className="taste-row">
                  <div className="taste-label">Сухий</div>
                  <div className="taste-bar">
                    <div
                      className="taste-value"
                      style={{ width: `${productData.tasteProfile.drySweet}%` }}
                    ></div>
                  </div>
                  <div className="taste-opposite">Солодкий</div>
                </div>

                <div className="taste-row">
                  <div className="taste-label">М'який</div>
                  <div className="taste-bar">
                    <div
                      className="taste-value"
                      style={{
                        width: `${productData.tasteProfile.softAcidic}%`,
                      }}
                    ></div>
                  </div>
                  <div className="taste-opposite">Кислотний</div>
                </div>
              </div>

              <div className="taste-description">
                <h4 className="text-oglad">
                  Огляд дегустації вин для любителів вина
                </h4>
                <p className="p text">
                  Смаковий профіль вина Santa Julia Reserva Malbec Valle de Uco
                  складений на основі 68 відгуків користувачів.
                </p>
              </div>
            </div>

            {/* Гастрономічні поєднання */}
            <div className="pairing-section">
              <h2>СМАКОВЕ ПОЄДНАННЯ</h2>
              <p className="pairing-text">
                Наші винні експерти вважають, що це аргентинське вино Malbec
                буде просто створене для цих страв. Приємного апетиту!
              </p>

              <div className="pairing-items">
                <div className="pairing-item">
                  <div className="pairing-image">
                    <div className="pairing-name">Яловичина</div>

                    <img src={yalovich} alt="Яловичина" />
                  </div>
                </div>

                <div className="pairing-item">
                  <div className="pairing-image">
                    <div className="pairing-name">Баранина</div>

                    <img src={baranina} alt="Баранина" />
                  </div>
                </div>

                <div className="pairing-item">
                  <div className="pairing-image">
                    <div className="pairing-name">Птиця</div>
                    <img src={bird} alt="Птиця" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Хлібні крихти */}
      <div className="container mx-auto px-4 py-4">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-link">
            Головна
          </Link>
          <span className="breadcrumb-separator">{" > "}</span>
          <Link to="/catalog" className="breadcrumb-link">
            Каталог
          </Link>
          <span className="breadcrumb-separator">{" > "}</span>
          <Link to="/catalog/red" className="breadcrumb-link">
            Червоні вина
          </Link>
          <span className="breadcrumb-separator">{" > "}</span>
          <Link to="/catalog/santa-julia" className="breadcrumb-link">
            Santa Julia
          </Link>
          <span className="breadcrumb-separator">{" > "}</span>
          <span className="breadcrumb-current">
            Santa Julia Reserva Malbec Valle de Uco
          </span>
        </div>
      </div>

      {/* Банер заголовка продукту */}
      <div className="product-banner">
        <div className="container mx-auto px-4">
          <div className="brand">SANTA JULIA</div>
          <h1>
            RESERVA MALBEC
            <br />
            VALLE DE UCO
          </h1>
        </div>
      </div>

      {/* Секція деталей продукту */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Зображення продукту */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="product-gallery">
              {/* Колонка мініатюр */}
              <div className="thumbnails">
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Головне зображення */}
              <div className="main-image">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                />
              </div>
            </div>
          </div>

          {/* Інформація про продукт */}
          <div className="w-full md:w-1/2 md:pl-8">
            {/* Рейтинг */}
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(productData.rating)
                      ? "★"
                      : i < productData.rating
                      ? "★"
                      : "☆"}
                  </span>
                ))}
              </div>
              <span className="reviews">
                {productData.rating} ({productData.reviews} відгуків)
              </span>
            </div>

            {/* Характеристики продукту */}
            <div className="specs-grid">
              <div className="spec-item">
                <div className="spec-label">Код товару:</div>
                <div className="text-id">{productData.id}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Солодкість:</div>
                <div className="text-taste">{productData.taste}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Тип:</div>
                <div className="text-label">{productData.type}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Країна:</div>
                <div className="text-country flex items-center">
                  <img
                    src={productData.countryFlag}
                    alt={productData.country}
                    className="country-flag"
                  />
                  {productData.country}
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Міцність:</div>
                <div className="text-label">{productData.alcohol}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Бренд:</div>
                <div className="text-label">{productData.brand}</div>
              </div>
            </div>

            {/* Секція ціни та кошика */}
            <div className="mb-8">
              <div className="price">{productData.price} ₴</div>

              <div className="flex items-center">
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={decreaseQuantity}>
                    −
                  </button>
                  <div className="quantity-value">{quantity}</div>
                  <button className="quantity-btn" onClick={increaseQuantity}>
                    +
                  </button>
                </div>

                <button className="add-to-cart-new" onClick={handleAddToCart}>
                  Додати у кошик
                </button>

                <button className="favorite-btn" onClick={toggleFavorite}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Табове меню */}
        <div className="tabs">
          {["Характеристики", "Оплата і доставка", "Відгуки"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Контент активної вкладки */}
        <div className="tab-content">{renderTabContent()}</div>

        {/* Вам також може сподобатися */}
        <div className="you-may-like">
          <h2 className="recommendation-title">ВАМ МОЖЕ СПОДОБАТИСЬ</h2>
          <div className="recommendation-grid">
            <div className="wine-card">
              <img src={new_bottle} alt="Penfolds Bin 60A" />
              <div className="name">Penfolds Bin 60A</div>
              <div className="type">Червоне вино</div>
              <div className="price">19 850₴</div>
            </div>

            <div className="wine-card">
              <img src={new_bottle1} alt="Penfolds Bin 60A" />
              <div className="name">Penfolds Bin 60A</div>
              <div className="type">Червоне вино</div>
              <div className="price">19 850₴</div>
            </div>

            <div className="wine-card">
              <img src={new_bottle2} alt="Penfolds Bin 60A" />
              <div className="name">Penfolds Bin 60A</div>
              <div className="type">Червоне вино</div>
              <div className="price">19 850₴</div>
            </div>
          </div>

          <div className="recommendation-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
