import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

function Checkout() {
  const key = process.env.REACT_APP_STRIPE_PUB_KEY;

  const { clientSecret } = useParams();

  const stripePromise = loadStripe(key);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

export default Checkout;
