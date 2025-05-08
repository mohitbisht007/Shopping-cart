
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/products');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProducts(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          console.error("Error fetching products:", err);
        }
      };
  
      fetchProducts();
    }, []);
  
    if (loading) {
      return <div className="text-center py-8">Loading products...</div>;
    }
  
    if (error) {
      return <div className="text-red-500 text-center py-8">Error loading products: {error}</div>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }
  
  export default ProductList;