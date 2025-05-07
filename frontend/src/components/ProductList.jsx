
import ProductCard from './ProductCard';

function ProductList() {
  // Sample product data
  const sampleProducts = [
    {
      _id: '1',
      name: 'Awesome T-Shirt',
      price: 25.99,
      image: 'https://via.placeholder.com/200/FFC0CB', // Pink placeholder
      rating: 4.5,
      numReviews: 22,
    },
    {
      _id: '2',
      name: 'Stylish Jeans',
      price: 49.99,
      image: 'https://via.placeholder.com/200/ADD8E6', // Light blue placeholder
      rating: 4.2,
      numReviews: 15,
    },
    {
      _id: '3',
      name: 'Cool Sneakers',
      price: 59.99,
      image: 'https://via.placeholder.com/200/90EE90', // Light green placeholder
      rating: 3.8,
      numReviews: 30,
    },
    {
      _id: '4',
      name: 'Elegant Watch',
      price: 99.99,
      image: 'https://via.placeholder.com/200/D3D3D3', // Light gray placeholder
      rating: 4.9,
      numReviews: 18,
    },
    {
      _id: '5',
      name: 'Cozy Sweater',
      price: 39.99,
      image: 'https://via.placeholder.com/200/FFA07A', // Light salmon placeholder
      rating: 4.0,
      numReviews: 10,
    },
    {
      _id: '6',
      name: 'Trendy Backpack',
      price: 45.50,
      image: 'https://via.placeholder.com/200/87CEEB', // Sky blue placeholder
      rating: 4.7,
      numReviews: 25,
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sampleProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;