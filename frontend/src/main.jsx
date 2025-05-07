import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

createRoot(document.getElementById("root")).render(
 
    <Elements stripe={stripePromise}>
       <StrictMode>
      <App />
      </StrictMode>
    </Elements>
);
