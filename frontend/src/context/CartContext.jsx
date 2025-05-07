import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Create a custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

// Create the Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Get total number of items in the cart
  const getCartItemCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};