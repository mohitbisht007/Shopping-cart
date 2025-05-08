import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function OrderConfirmationPage() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching order:', err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="py-8 text-center">Loading order details...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!order) {
    return <div className="py-8 text-center">Order not found.</div>;
  }

  return (
    <div className="py-8 max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">Order Confirmation</h2>
      <p className="mb-2">Your order has been placed successfully!</p>
      <p className="mb-4">Order ID: <span className="font-semibold">{order._id}</span></p>

      <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
      <ul>
        {order.orderItems.map((item) => (
          <li key={item.product} className="flex justify-between py-1 border-b">
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p>Total Price: <span className="font-semibold">₹{order.totalPrice}</span></p>
        <p>Shipping Address:</p>
        <address className="not-italic">
          {order.shippingAddress.address},<br />
          {order.shippingAddress.city}, {order.shippingAddress.postalCode},<br />
          {order.shippingAddress.country}
        </address>
        <p>Payment Method: {order.paymentMethod}</p>
        <p>Payment Status: <span className={order.isPaid ? 'text-green-500' : 'text-red-500'}>{order.isPaid ? 'Paid' : 'Not Paid'}</span></p>
      </div>

      <Link to="/myorders" className="inline-block mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        View My Orders
      </Link>
      <Link to="/" className="inline-block mt-2 text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderConfirmationPage;