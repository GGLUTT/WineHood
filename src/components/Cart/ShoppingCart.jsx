import React from 'react';
import './ShoppingCart.css';
import { useCart } from '../Context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import recomend from '../../img/card/new_botlle.png'
import trashIcon from '../../img/ico/trash.svg'

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, toggleCart, getTotalItems } = useCart();
  
  const handleCheckout = () => {
    navigate('/checkout');
    toggleCart(); // Close the cart when proceeding to checkout
  };
  
  // Function to get correct item text with plural forms in Ukrainian
  const getItemText = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "товар";
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return "товари";
    } else {
      return "товарів";
    }
  };
  
  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h3>Ваш кошик</h3>
        <button className="close-cart" onClick={toggleCart}>×</button>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Ваш кошик порожній</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-type">Червоне сухе вино</div>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <img src={trashIcon} alt="Видалити" />
                    </button>
                  </div>
                  <div className="price-quantity-row">
                    <div className="item-price">{item.price} ₴</div>
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="recommendations">
            <h3>Вас може зацікавити</h3>
            <div className="recommended-item">
              <div className="rec-image">
                <img src={recomend} alt="Terrazas de los Andes" />
              </div>
              <div className="rec-details">
                <div className="rec-name">Terrazas de los Andes</div>
                <div className="rec-type">Червоне сухе вино</div>
                <div className="rec-price">890 ₴</div>
              </div>
              <button className="add-button">ДОДАТИ</button>
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="subtotal-label">
              Проміжний підсумок <span className="item-count">({getTotalItems()} {getItemText(getTotalItems())})</span>
            </div>
            <div className="subtotal-amount">{getTotalAmount()} ₴</div>
          </div>
          
          <div className="cart-footer">
            <button className="checkout-button">ПРОДОВЖИТИ ПОКУПКИ</button>
            <button className="continue-shopping" onClick={handleCheckout}>ПЕРЕЙТИ ДО ОФОРМЛЕННЯ</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;