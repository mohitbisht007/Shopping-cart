// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart hook

function Header() {
  const { getItemCount } = useCart(); // Get the cart item count

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">My E-Commerce</Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-700">Home</Link>
            </li>
            {/* Add other navigation links here */}
            <li>
              <Link to="/cart" className="flex items-center hover:text-gray-700">
                <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Cart ({getItemCount()})</span>
              </Link>
            </li>
            {/* Add login/signup links or user info here */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;