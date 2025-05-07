import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', { // Your login API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Store token and user info (e.g., in localStorage or a context)
        localStorage.setItem('authToken', data.token); // Example: storing token
        localStorage.setItem('userInfo', JSON.stringify(data.user)); // Example: storing user info
        setLoading(false);
        navigate('/'); // Redirect to homepage after successful login
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
        setLoading(false);
      }
    } catch (err) {
      setError('There was an error during login.');
      setLoading(false);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
          <Link to="/forgotpassword" className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs mt-4">
        Don't have an account? <Link to="/signup" className="font-semibold text-blue-500 hover:text-blue-800">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;