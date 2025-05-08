import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // Set to 'stripe'
  const [clientSecret, setClientSecret] = useState(null); // To store Stripe client_secret
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = getTotalPrice();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  // 1. Create Order and get Client Secret
  useEffect(() => {
    const createOrder = async () => {
      try {
        const orderData = {
          orderItems: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
          })),
          shippingAddress,
          paymentMethod: 'stripe', // Hardcoded to 'stripe'
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: totalPrice,
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (response.ok) {
          setClientSecret(data.clientSecret); // Get the clientSecret
        } else {
          setError(data.message || 'Failed to create order');
          setLoading(false);
        }
      } catch (error) {
        setError(error.message || 'Error creating order');
        setLoading(false);
      }
    };

    if (cartItems.length > 0) {
      createOrder();
    }
  }, [cartItems, shippingAddress, totalPrice]);

  // 2. Handle Payment and Order Confirmation
  const placeOrder = async () => {
    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded yet.
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Confirm the PaymentIntent with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to include the clientSecret
          clientSecret: clientSecret,
          // Return URL is IMPORTANT for some payment methods like 3D Secure
          return_url: `${window.location.origin}/order-confirmation`, //  Important
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Payment was successful!  Update your order in your backend
        const updateResponse = await fetch(`/api/orders/${paymentIntent.metadata.order_id}/pay`, { // Use order_id from metadata
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            receipt_email: paymentIntent.receipt_email,
          }),
        });
        const updateData = await updateResponse.json();

        if (updateResponse.ok) {
          clearCart();
          navigate(`/order/${paymentIntent.metadata.order_id}`); //  Go to confirmation
        } else {
          setError(updateData.message || 'Failed to update order after successful payment');
          setLoading(false);
        }
      } else {
        setError('Payment failed');
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || 'An error occurred during payment');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Processing payment...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product} className="py-2 border-b">
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-4 font-semibold">Total: ₹{totalPrice}</div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Shipping Address</h3>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Payment Method</h3>
          <div className="mb-4">
            <p>Stripe</p>
            {clientSecret && (
              <PaymentElement />
            )}
          </div>

          <button
            onClick={placeOrder}
            disabled={!stripe || !elements || !clientSecret}
            className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 mt-4"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

// Wrap with Stripe Elements provider
import { Elements } from '@stripe/react-stripe-js';
const StripeCheckoutPage = () => {
  return (
    <Elements>
      <CheckoutPage />
    </Elements>
  );
};

export default StripeCheckoutPage;
