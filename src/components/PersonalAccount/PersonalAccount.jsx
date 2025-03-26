import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalAccount.css";
import "./PersonalAccountAnimations.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PersonalAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedCategories, setExpandedCategories] = useState({
    personalInfo: true,
    contactInfo: false,
    deliveryAddresses: false,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setUserData((prevData) => ({
        ...prevData,
        avatar: "custom",
      }));

      uploadAvatar(file);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || process.env.NODE_ENV === "development") {
        console.log("Avatar would be uploaded in production");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(
        "https://api.your-domain.com/api/user/avatar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося завантажити аватар");
      }

      const data = await response.json();
      console.log("Avatar uploaded successfully", data);
    } catch (error) {
      console.error("Помилка завантаження аватара:", error);
    }
  };

  // Initial user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
    birthDate: "",
    gender: "",
    orders: [],
    wishlist: [],
    addresses: {
      novaPoshta: [
        { id: 1, city: "", office: "" },
        { id: 2, city: "", office: "" },
        { id: 3, city: "", office: "" },
      ],
      delivery: [{ id: 1, city: "", street: "", building: "", apartment: "" }],
    },
  });

  const [formData, setFormData] = useState(userData);
  const [editMode, setEditMode] = useState({
    personalInfo: false,
    phone: false,
    email: false,
  });

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    const loadUserData = () => {
      // Перевіряємо авторизацію
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        // Якщо користувач не авторизований, перенаправляємо на сторінку входу
        navigate("/login", { state: { from: "/account" } });
        return;
      }

      try {
        // Парсимо дані користувача з localStorage
        const user = JSON.parse(storedUser);

        // Оновлюємо стан з даними користувача
        setUserData((prevData) => ({
          ...prevData,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          avatar: user.avatar || "",
          // Додаткові дані можна завантажити з API за потреби
        }));
        if (user.avatar && user.avatar !== 'custom' && !user.avatar.startsWith('http')) {
          setAvatarPreview(user.avatar);
        }

        // Також оновлюємо formData для редагування
        setFormData((prevData) => ({
          ...prevData,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
        }));

        // Тут можна додати запит до API для отримання повних даних користувача
        fetchUserData(token);
      } catch (error) {
        console.error("Помилка завантаження даних користувача:", error);
        navigate("/login");
      }
    };

    loadUserData();
  }, [navigate]);

  // Функція для отримання повних даних користувача з API
  const fetchUserData = async (token) => {
    // В режимі розробки можна використовувати тестові дані
    if (process.env.NODE_ENV === "development") {
      // Імітуємо запит до API для отримання тестових даних
      setTimeout(() => {
        const testData = {
          orders: [
            {
              id: "25789",
              date: "15.03.2025",
              status: "Доставлено",
              amount: "1450 грн",
            },
            {
              id: "24563",
              date: "02.02.2025",
              status: "В обробці",
              amount: "890 грн",
            },
          ],
          wishlist: [
            { id: 1, name: "Сукня літня", price: "950 грн" },
            { id: 2, name: "Блуза біла", price: "750 грн" },
          ],
        };

        setUserData((prevData) => ({
          ...prevData,
          orders: testData.orders,
          wishlist: testData.wishlist,
        }));
      }, 500);
      return;
    }

    try {
      // Запит до API для отримання даних користувача
      const response = await fetch(
        "https://api.your-domain.com/api/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося отримати дані користувача");
      }

      const data = await response.json();

      // Оновлюємо стан з отриманими даними
      setUserData((prevData) => ({
        ...prevData,
        ...data,
      }));
    } catch (error) {
      console.error("Помилка отримання даних користувача:", error);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    });
  };

  // Toggle edit mode for sections
  const toggleEditMode = (section) => {
    setEditMode({
      ...editMode,
      [section]: !editMode[section],
    });

    if (!editMode[section]) {
      setFormData({ ...userData });
    }
  };

  // Handle input changes
  const handleInputChange = (e, section, field) => {
    if (section === "personalInfo") {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    } else if (section.startsWith("novaPoshta-")) {
      const index = parseInt(section.split("-")[1]);
      const updatedNovaPoshta = [...formData.addresses.novaPoshta];
      updatedNovaPoshta[index] = {
        ...updatedNovaPoshta[index],
        [field]: e.target.value,
      };

      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          novaPoshta: updatedNovaPoshta,
        },
      });
    } else if (section.startsWith("delivery-")) {
      const index = parseInt(section.split("-")[1]);
      const updatedDelivery = [...formData.addresses.delivery];
      updatedDelivery[index] = {
        ...updatedDelivery[index],
        [field]: e.target.value,
      };

      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          delivery: updatedDelivery,
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: e.target.value,
      });
    }
  };

  // Save changes
  const saveChanges = async (section) => {
    // Інформація для оновлення
    let dataToUpdate = {};

    if (section === "personalInfo") {
      dataToUpdate = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        gender: formData.gender,
      };
    } else if (section === "phone") {
      dataToUpdate = {
        phone: formData.phone,
      };
    } else if (section === "email") {
      dataToUpdate = {
        email: formData.email,
      };
    } else if (section === "addresses") {
      dataToUpdate = {
        addresses: formData.addresses,
      };
    }

    // Оновлюємо в локальному стані
    setUserData((prevData) => ({
      ...prevData,
      ...dataToUpdate,
    }));

    // Оновлюємо дані користувача в localStorage
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...storedUser, ...dataToUpdate };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error(
        "Помилка оновлення даних користувача в localStorage:",
        error
      );
    }

    // Тут можна додати запит до API для оновлення даних на сервері
    try {
      const token = localStorage.getItem("token");

      if (token && process.env.NODE_ENV !== "development") {
        const response = await fetch(
          `https://api.your-domain.com/api/user/update/${section}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate),
          }
        );

        if (!response.ok) {
          throw new Error("Не вдалося оновити дані користувача");
        }
      }
    } catch (error) {
      console.error("Помилка оновлення даних користувача на сервері:", error);
    }

    // Exit edit mode
    toggleEditMode(section);
  };

  // Cancel changes
  const cancelChanges = (section) => {
    // Reset form data and exit edit mode
    setFormData({ ...userData });
    toggleEditMode(section);
  };

  // Функція для виходу з аккаунту
  const logout = () => {
    // Очищаємо дані користувача з localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Перенаправляємо на сторінку входу
    navigate("/login");
  };

  // ... інші функції (removeNovaPoshtaAddress, removeDeliveryAddress, addDeliveryAddress, removeWishlistItem)

  // ... renderCategory, renderPersonalInfoContent, renderContactInfoContent, renderDeliveryAddressesContent

  const removeNovaPoshtaAddress = (index) => {
    const updatedNovaPoshta = [...formData.addresses.novaPoshta];
    updatedNovaPoshta[index] = {
      id: updatedNovaPoshta[index].id,
      city: "",
      office: "",
    };

    setFormData({
      ...formData,
      addresses: {
        ...formData.addresses,
        novaPoshta: updatedNovaPoshta,
      },
    });

    // Save changes immediately
    setUserData({
      ...userData,
      addresses: {
        ...userData.addresses,
        novaPoshta: updatedNovaPoshta,
      },
    });
  };

  // Remove delivery address
  const removeDeliveryAddress = (index) => {
    const updatedDelivery = [...formData.addresses.delivery];
    updatedDelivery.splice(index, 1);

    setFormData({
      ...formData,
      addresses: {
        ...formData.addresses,
        delivery: updatedDelivery,
      },
    });

    // Save changes immediately
    setUserData({
      ...userData,
      addresses: {
        ...userData.addresses,
        delivery: updatedDelivery,
      },
    });
  };

  // Add delivery address
  const addDeliveryAddress = () => {
    if (formData.addresses.delivery.length < 3) {
      const newDeliveryAddress = {
        id: Date.now(), // Simple unique ID
        city: "",
        street: "",
        building: "",
        apartment: "",
      };

      const updatedDelivery = [
        ...formData.addresses.delivery,
        newDeliveryAddress,
      ];

      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          delivery: updatedDelivery,
        },
      });

      // Save changes immediately
      setUserData({
        ...userData,
        addresses: {
          ...userData.addresses,
          delivery: updatedDelivery,
        },
      });
    }
  };

  // Remove wishlist item
  const removeWishlistItem = (id) => {
    const updatedWishlist = userData.wishlist.filter((item) => item.id !== id);
    setUserData({
      ...userData,
      wishlist: updatedWishlist,
    });
  };

  // Render category component
  const renderCategory = (title, id, content) => (
    <div className="ua-category">
      <div className="ua-category-header" onClick={() => toggleCategory(id)}>
        <h4>{title}</h4>
        <span className="ua-chevron">{expandedCategories[id] ? "∧" : "∨"}</span>
      </div>
      {expandedCategories[id] && (
        <div className="ua-category-content">{content}</div>
      )}
    </div>
  );

  const ChangeEmailPopup = () => {
    const handleSendCode = () => {
      // Here would be the API call to send verification code
      setIsCodeSent(true);
    };

    const handleSubmit = () => {
      // Here would be the API call to verify code and update email
      if (verificationCode) {
        setUserData(prev => ({
          ...prev,
          email: newEmail
        }));
        setShowEmailPopup(false);
        setIsCodeSent(false);
        setVerificationCode("");
        setNewEmail("");
      }
    };

    return (
      <div className="ua-popup-overlay">
        <div className="ua-popup">
          <button className="ua-popup-close" onClick={() => setShowEmailPopup(false)}>✕</button>
          <h3>ЗМІНИТИ ПОШТУ</h3>
          <p>Ваша пошта є логіном до профілю. Для зміни пошти потрібно написати нову та підтвердити її за допомогою коду, який прийде в повідомленні</p>
          <div className="ua-popup-form">
            <div className="ua-form-group">
              <label>Нова електронна пошта</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Введіть нову адресу"
              />
            </div>
            {isCodeSent && (
              <div className="ua-form-group">
                <label>Код підтвердження</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Введіть код"
                />
              </div>
            )}
            <button 
              className="ua-button ua-button-primary"
              onClick={isCodeSent ? handleSubmit : handleSendCode}
            >
              {isCodeSent ? "ПІДТВЕРДИТИ" : "НАДІСЛАТИ ОДНОРАЗОВИЙ КОД"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ChangePhonePopup = () => {
    const handleSendCode = () => {
      // Here would be the API call to send verification code
      setIsCodeSent(true);
    };

    const handleSubmit = () => {
      // Here would be the API call to verify code and update phone
      if (verificationCode) {
        setUserData(prev => ({
          ...prev,
          phone: newPhone
        }));
        setShowPhonePopup(false);
        setIsCodeSent(false);
        setVerificationCode("");
        setNewPhone("");
      }
    };

    return (
      <div className="ua-popup-overlay">
        <div className="ua-popup">
          <button className="ua-popup-close" onClick={() => setShowPhonePopup(false)}>✕</button>
          <h3>ЗМІНИТИ ТЕЛЕФОН</h3>
          <p>Для зміни номера телефону потрібно написати новий та підтвердити його за допомогою коду, який прийде в повідомленні</p>
          <div className="ua-popup-form">
            <div className="ua-form-group">
              <label>Новий номер телефону</label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+380"
              />
            </div>
            {isCodeSent && (
              <div className="ua-form-group">
                <label>Код підтвердження</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Введіть код"
                />
              </div>
            )}
            <button 
              className="ua-button ua-button-primary"
              onClick={isCodeSent ? handleSubmit : handleSendCode}
            >
              {isCodeSent ? "ПІДТВЕРДИТИ" : "НАДІСЛАТИ ОДНОРАЗОВИЙ КОД"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render personal info form
  const renderPersonalInfoContent = () => (
    <div className="ua-personal-info-form">
      {editMode.personalInfo ? (
        <>
          <div className="ua-form-group">
            <label>Ім'я</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                handleInputChange(e, "personalInfo", "firstName")
              }
            />
          </div>
          <div className="ua-form-group">
            <label>Прізвище</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e, "personalInfo", "lastName")}
            />
          </div>
          <div className="ua-form-group">
            <label>Дата народження</label>
            <input
              type="text"
              placeholder="00/00/0000"
              value={formData.birthDate}
              onChange={(e) =>
                handleInputChange(e, "personalInfo", "birthDate")
              }
            />
          </div>
          <div className="ua-form-group">
            <label>Стать</label>
            <div className="ua-radio-group">
              <label className="ua-radio">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) =>
                    handleInputChange(
                      { target: { value: "male" } },
                      "personalInfo",
                      "gender"
                    )
                  }
                />
                Чоловіча
              </label>
              <label className="ua-radio">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) =>
                    handleInputChange(
                      { target: { value: "female" } },
                      "personalInfo",
                      "gender"
                    )
                  }
                />
                Жіноча
              </label>
              <label className="ua-radio">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={(e) =>
                    handleInputChange(
                      { target: { value: "other" } },
                      "personalInfo",
                      "gender"
                    )
                  }
                />
                Інша
              </label>
            </div>
          </div>
          <div className="ua-form-actions">
            <button
              className="ua-button ua-button-primary"
              onClick={() => saveChanges("personalInfo")}
            >
              ЗБЕРЕГТИ
            </button>
            <button
              className="ua-button ua-button-secondary"
              onClick={() => cancelChanges("personalInfo")}
            >
              СКАСУВАТИ
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="ua-info-display">
            <div className="ua-info-row">
              <div className="ua-info-label">ПІБ</div>
              <div className="ua-info-value">
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            <div className="ua-info-row">
              <div className="ua-info-label">Дата народження</div>
              <div className="ua-info-value">
                {userData.birthDate || "Не вказано"}
              </div>
            </div>
            <div className="ua-info-row">
              <div className="ua-info-label">Стать</div>
              <div className="ua-info-value">
                {userData.gender === "male"
                  ? "Чоловіча"
                  : userData.gender === "female"
                  ? "Жіноча"
                  : userData.gender === "other"
                  ? "Інша"
                  : "Не вказано"}
              </div>
            </div>
          </div>
          <button
            className="ua-button ua-button-primary ua-edit-btn"
            onClick={() => toggleEditMode("personalInfo")}
          >
            РЕДАГУВАТИ
          </button>
        </>
      )}
    </div>
  );

  // Render contact info form
  const renderContactInfoContent = () => (
    <div className="ua-contact-info-form">
      <div className="ua-form-group">
        <label>Телефон</label>
        <div className="ua-edit-field">
          <span>{userData.phone || "Не вказано"}</span>
          <button
            className="ua-edit-button"
            onClick={() => setShowPhonePopup(true)}
          >
            ЗМІНИТИ
          </button>
        </div>
      </div>
      <div className="ua-form-group">
        <label>Адреса електронної пошти (email)</label>
        <div className="ua-edit-field">
          <span>{userData.email}</span>
          <button
            className="ua-edit-button"
            onClick={() => setShowEmailPopup(true)}
          >
            ЗМІНИТИ
          </button>
        </div>
      </div>
      {showEmailPopup && <ChangeEmailPopup />}
      {showPhonePopup && <ChangePhonePopup />}
    </div>
  );

  // Render delivery addresses form
  const renderDeliveryAddressesContent = () => (
    <div className="ua-delivery-addresses-form">
      <div className="ua-form-section">
        <h5>
          Відділення Нової Пошти <span>(максимальна кількість: 3)</span>
        </h5>
        <div className="ua-nova-poshta-section">
          {formData.addresses.novaPoshta.map((address, index) => (
            <div key={`np-${address.id}`} className="ua-address-row">
              <div className="ua-address-field">
                <label>Місто</label>
                <select
                  value={address.city}
                  onChange={(e) =>
                    handleInputChange(e, `novaPoshta-${index}`, "city")
                  }
                  className={!address.city ? "ua-select-placeholder" : ""}
                >
                  <option value="" disabled>
                    Введіть назву міста
                  </option>
                  <option value="Київ">Київ</option>
                  <option value="Львів">Львів</option>
                  <option value="Одеса">Одеса</option>
                  <option value="Харків">Харків</option>
                  <option value="Дніпро">Дніпро</option>
                </select>
              </div>
              <div className="ua-address-field">
                <label>Відділення</label>
                <select
                  value={address.office}
                  onChange={(e) =>
                    handleInputChange(e, `novaPoshta-${index}`, "office")
                  }
                  disabled={!address.city}
                  className={!address.office ? "ua-select-placeholder" : ""}
                >
                  <option value="" disabled>
                    Введіть відділення
                  </option>
                  <option value="Відділення №1">Відділення №1</option>
                  <option value="Відділення №2">Відділення №2</option>
                  <option value="Відділення №3">Відділення №3</option>
                  <option value="Відділення №4">Відділення №4</option>
                  <option value="Відділення №5">Відділення №5</option>
                </select>
              </div>
              <button
                className="ua-delete-button"
                onClick={() => removeNovaPoshtaAddress(index)}
                disabled={!address.city && !address.office}
              >
                <span className="ua-delete-icon">🗑</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="ua-form-section">
        <h5>
          Адреса доставки <span>(максимальна кількість: 3)</span>
        </h5>
        <div className="ua-delivery-address-section">
          {formData.addresses.delivery.map((address, index) => (
            <div key={`delivery-${address.id}`} className="ua-delivery-block">
              <div className="ua-address-row">
                <div className="ua-address-field">
                  <label>Місто</label>
                  <select
                    value={address.city}
                    onChange={(e) =>
                      handleInputChange(e, `delivery-${index}`, "city")
                    }
                    className={!address.city ? "ua-select-placeholder" : ""}
                  >
                    <option value="" disabled>
                      Введіть назву міста
                    </option>
                    <option value="Київ">Київ</option>
                    <option value="Львів">Львів</option>
                    <option value="Одеса">Одеса</option>
                    <option value="Харків">Харків</option>
                    <option value="Дніпро">Дніпро</option>
                  </select>
                </div>
                <div className="ua-address-field">
                  <label>Вулиця</label>
                  <select
                    value={address.street}
                    onChange={(e) =>
                      handleInputChange(e, `delivery-${index}`, "street")
                    }
                    disabled={!address.city}
                    className={!address.street ? "ua-select-placeholder" : ""}
                  >
                    <option value="" disabled>
                      Введіть назву вулиці
                    </option>
                    <option value="Хрещатик">Хрещатик</option>
                    <option value="Богдана Хмельницького">
                      Богдана Хмельницького
                    </option>
                    <option value="Володимирська">Володимирська</option>
                    <option value="Шевченка">Шевченка</option>
                    <option value="Лесі Українки">Лесі Українки</option>
                  </select>
                </div>
              </div>
              <div className="ua-address-row">
                <div className="ua-address-field small">
                  <label>Будинок</label>
                  <input
                    type="text"
                    placeholder="Введіть номер"
                    value={address.building || ""}
                    onChange={(e) =>
                      handleInputChange(e, `delivery-${index}`, "building")
                    }
                    disabled={!address.street}
                  />
                </div>
                <div className="ua-address-field small">
                  <label>Квартира</label>
                  <input
                    type="text"
                    placeholder="Введіть номер"
                    value={address.apartment || ""}
                    onChange={(e) =>
                      handleInputChange(e, `delivery-${index}`, "apartment")
                    }
                    disabled={!address.building}
                  />
                </div>
                <button
                  className="ua-delete-button"
                  onClick={() => removeDeliveryAddress(index)}
                >
                  <span className="ua-delete-icon">🗑</span>
                </button>
              </div>
            </div>
          ))}
          {formData.addresses.delivery.length < 3 && (
            <button className="ua-add-button" onClick={addDeliveryAddress}>
              ДОДАТИ АДРЕСУ
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Render orders list
  const renderOrdersContent = () => (
    <div className="ua-orders-list">
      {userData.orders.length === 0 ? (
        <div className="ua-empty-state">У вас ще немає замовлень</div>
      ) : (
        userData.orders.map((order) => (
          <div key={order.id} className="ua-order-item">
            <div className="ua-order-header">
              <div className="ua-order-number">Замовлення №{order.id}</div>
              <div className="ua-order-date">{order.date}</div>
            </div>
            <div className="ua-order-details">
              <div className="ua-order-status">{order.status}</div>
              <div className="ua-order-amount">{order.amount}</div>
            </div>
            <button className="ua-order-details-btn">Деталі</button>
          </div>
        ))
      )}
    </div>
  );

  // Render wishlist items
  const renderWishlistContent = () => (
    <div className="ua-wishlist-grid">
      {userData.wishlist.length === 0 ? (
        <div className="ua-empty-state">У вас ще немає обраних товарів</div>
      ) : (
        userData.wishlist.map((item) => (
          <div key={item.id} className="ua-wishlist-item">
            <div className="ua-wishlist-image">
              <div className="ua-placeholder-image"></div>
            </div>
            <div className="ua-wishlist-details">
              <div className="ua-wishlist-name">{item.name}</div>
              <div className="ua-wishlist-price">{item.price}</div>
            </div>
            <button className="ua-add-to-cart">В КОШИК</button>
            <button
              className="ua-remove-wishlist"
              onClick={() => removeWishlistItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );

  // Render main tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <div className="ua-orders-tab">{renderOrdersContent()}</div>;
      case "wishlist":
        return <div className="ua-wishlist-tab">{renderWishlistContent()}</div>;
      case "profile":
        return (
          <div className="ua-profile-tab">
            {renderCategory(
              "Особиста інформація",
              "personalInfo",
              renderPersonalInfoContent()
            )}
            {renderCategory(
              "Контактна інформація",
              "contactInfo",
              renderContactInfoContent()
            )}
            {renderCategory(
              "Адреси",
              "deliveryAddresses",
              renderDeliveryAddressesContent()
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ua-personal-account">
      <Header></Header>

      <header className="ua-account-header">
        <h1>ОСОБИСТИЙ КАБІНЕТ</h1>
        <div className="ua-user-info">
          <div
            className="ua-avatar"
            onClick={triggerFileInput}
            style={{ cursor: "pointer" }}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User avatar"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              userData.firstName.charAt(0) + userData.lastName.charAt(0)
            )}

            {/* Прихований input для завантаження файлу */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="ua-user-details">
            <h2>
              {userData.firstName} {userData.lastName}
            </h2>
            <p>{userData.email}</p>
            <div className="ua-instagram-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1.44c2.136 0 2.389.009 3.232.047.78.036 1.203.166 1.485.275.374.145.64.318.92.598.28.28.453.546.598.92.109.282.24.705.275 1.485.038.843.047 1.096.047 3.232s-.009 2.389-.047 3.232c-.036.78-.166 1.203-.275 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.109-.705.24-1.485.275-.843.038-1.096.047-3.232.047s-2.389-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.275-.374-.145-.64-.318-.92-.598-.28-.28-.453-.546-.598-.92-.109-.282-.24-.705-.275-1.485-.038-.843-.047-1.096-.047-3.232s.009-2.389.047-3.232c.036-.78.166-1.203.275-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.109.705-.24 1.485-.275.843-.038 1.096-.047 3.232-.047M8 0C5.827 0 5.555.01 4.702.048c-.852.039-1.433.174-1.942.372-.526.204-.972.478-1.417.923-.445.445-.72.891-.923 1.417-.198.509-.333 1.09-.372 1.942C.01 5.555 0 5.827 0 8s.01 2.445.048 3.298c.039.852.174 1.433.372 1.942.204.526.478.972.923 1.417.445.445.891.72 1.417.923.509.198 1.09.333 1.942.372.853.038 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.039 1.433-.174 1.942-.372.526-.204.972-.478 1.417-.923.445-.445.72-.891.923-1.417.198-.509.333-1.09.372-1.942.038-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.039-.852-.174-1.433-.372-1.942-.204-.526-.478-.972-.923-1.417-.445-.445-.891-.72-1.417-.923-.509-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 3.892a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm0 6.775a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm5.23-6.937a.96.96 0 11-1.92 0 .96.96 0 011.92 0z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="ua-account-content">
        <nav className="ua-account-nav">
          <button
            className={`ua-nav-button ${
              activeTab === "orders" ? "ua-active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            ІСТОРІЯ ЗАМОВЛЕНЬ
          </button>
          <button
            className={`ua-nav-button ${
              activeTab === "wishlist" ? "ua-active" : ""
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            ОБРАНЕ
          </button>
          <button
            className={`ua-nav-button ${
              activeTab === "profile" ? "ua-active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            ПРОФІЛЬ
          </button>
          <button className="ua-nav-button ua-logout" onClick={logout}>
            ВИЙТИ
          </button>
        </nav>

        <main className="ua-tab-content">{renderTabContent()}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalAccount;
