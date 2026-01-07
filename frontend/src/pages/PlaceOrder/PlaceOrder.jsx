import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext); // FIXED: Access context

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!"); // Replace with actual order processing
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}> {/* FIXED: Added onSubmit */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' required />
          <input type="text" placeholder='Last name' required />
        </div>
        <input type="email" placeholder='Email Address' required />
        <input type="text" placeholder='Street' required />
        <input type="text" placeholder='Phone' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p> {/* FIXED: Access function properly */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b> {/* FIXED: Access function properly */}
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button> {/* FIXED: Button submits form */}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
