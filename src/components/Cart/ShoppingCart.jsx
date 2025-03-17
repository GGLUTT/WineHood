import React from 'react';
import './ShoppingCart.css';
import { useCart } from '../Context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import recomend from '../../img/card/new_botlle.png'

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, toggleCart } = useCart();
  
  const handleCheckout = () => {
    navigate('/checkout');
    toggleCart(); // Close the cart when proceeding to checkout
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
                  <div className="item-name">{item.name}</div>
                  <div className="item-type">Червоне сухе вино</div>
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
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4H14V14C14 15.1 13.1 16 12 16H4C2.9 16 2 15.1 2 14V4Z" fill="#DDDDDD"/>
                    <path d="M12 2V0H4V2H0V4H16V2H12Z" fill="#DDDDDD"/>
                  </svg>
                </button>
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
              Проміжний підсумок <span className="item-count">(1 товар)</span>
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