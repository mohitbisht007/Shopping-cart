import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './components/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} /> {/* Add the new route */}
          <Route path="/login" element={<LoginPage />} /> {/* Add login route */}
          <Route path="/signup" element={<SignupPage />} /> {/* Add signup route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;