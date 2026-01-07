import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // FIXED: Import useNavigate
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate(); // FIXED: Initialize useNavigate

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] && cartItems[item._id] > 0) { // FIXED: Added check to prevent undefined errors
            return (
              <div key={item._id}>  {/* FIXED: Added unique key */}
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // FIXED: Ensures undefined cases don't return anything
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p> {/* FIXED: Called function properly */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b> {/* FIXED: Called function properly */}
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button> {/* FIXED: Button click issue */}
        </div>
        <div className="cart-promocode">
          <div>
            <p>Have a promo code?</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Enter promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cart;
