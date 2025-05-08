import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`); // Basic feedback
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching product details:", err);
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-fetch if the productId changes

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error loading product details: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-gray-700 mb-4">₹{product.price}</p>
          <div className="flex items-center mb-4">
            {product.rating && (
              <>
                {[...Array(Math.round(product.rating))].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.176-6.545L.587 6.951h6.545L10 .5l2.868 6.451h6.545L14.706 11.545l1.176 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-2">({product.numReviews || 0} reviews)</span>
              </>
            )}
          </div>
          <button className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <Link to="/" className="inline-block mt-4 text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;