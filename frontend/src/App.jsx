import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './components/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/RegisterPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import StripeCheckoutPage from './pages/CheckoutPage';
import { Elements } from '@stripe/react-stripe-js';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { loadStripe } from '@stripe/stripe-js';
import { useMemo } from 'react';

const StripeWrapper = () => {
  const stripePromise = useMemo(() => loadStripe('pk_test_51OtOI1SBY5j2XJI1tN0WELVKoXINYaEnY98RJATxrVOhYuZ9OxmPU3fivMpM5vJoSWZMe6CuNJDu2As9IWvgoJeI00mfwt862S'), []);
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutPage />
    </Elements>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<StripeWrapper />} />
            <Route path="/order/:id" element={<OrderConfirmationPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;