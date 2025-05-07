import React, { useContext } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.productId}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      <h3>Total: ${totalAmount}</h3>
      <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
    </div>
  );
};

export default CartPage;