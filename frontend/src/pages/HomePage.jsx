import ProductList from "../components/ProductList";

function HomePage() {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome to the Home Page!</h2>
        <p className="text-gray-600">This is a very basic homepage structure.</p>
        <ProductList />
        {/* We will add product listings here later */}
      </div>
    );
  }
  
  export default HomePage;