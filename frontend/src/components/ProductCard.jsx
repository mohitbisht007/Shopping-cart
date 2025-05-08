import { Link } from 'react-router-dom'; // Import Link for navigation

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-lg object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <div className="flex items-center mb-2">
          {product.rating && (
            <>
              {[...Array(Math.round(product.rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.176-6.545L.587 6.951h6.545L10 .5l2.868 6.451h6.545L14.706 11.545l1.176 6.545z" />
                </svg>
              ))}
              {[...Array(5 - Math.round(product.rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.176-6.545L.587 6.951h6.545L10 .5l2.868 6.451h6.545L14.706 11.545l1.176 6.545z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">({product.numReviews || 0})</span>
            </>
          )}
        </div>
        <Link to={`/products/${product._id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;