import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id} className="flex items-center py-4 border-b">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-grow">
              <Link to={`/products/${item._id}`} className="text-lg font-medium hover:underline">{item.name}</Link>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, e.target.value)}
                className="w-16 text-center border rounded mr-2"
              />
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Total: ₹{getTotalPrice()}</h3>
        <div className="space-x-2">
          <button onClick={clearCart} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Clear Cart
          </button>
          <Link to="/checkout" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;