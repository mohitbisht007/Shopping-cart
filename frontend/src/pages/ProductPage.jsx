import React from 'react';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a description of Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description of Product 2',
      price: 49.99,
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description of Product 3',
      price: 19.99,
      image: 'https://via.placeholder.com/300',
    },
    // Add more products as needed
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
