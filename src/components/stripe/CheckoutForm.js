import React, { useState, useEffect, useContext } from "react";
import masterCard from "../../images/icons/mastercard-full-svgrepo-com.svg";
import visaCard from "../../images/icons/visa-svgrepo-com.svg";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import "../../css/stripe.css";
import useCartState from "../../hooks/cartHooks";
import { MessageContext } from "../../context/MessageContext";
import { createMessage } from "../../actions/messages";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ clientSecret }) {
  const [cardType, setCardType] = useState("");

  const { dispatchMessage } = useContext(MessageContext);

  const navigate = useNavigate();

  const { total, getTotal, getCarts, delivery, carts } = useCartState();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getTotal(carts.carts);
    getCarts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
        return_url: process.env.REACT_APP_HOME_URL,
      }
    );

    if (error) {
      dispatchMessage(createMessage({ paymentFailed: error.message }));
    } else {
      dispatchMessage(
        createMessage({ paymentSucceeded: "Payment was Successful" })
      );
      navigate("/");
    }
  };

  const handleCardNumberChange = (e) => {
    if (e.brand === "visa") {
      setCardType("visa");
    } else if (e.brand === "mastercard") {
      setCardType("mastercard");
    } else {
      setCardType("");
    }
  };

  const element = {
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000000",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#a9a9a9",
          textTransform: "lowercase",
        },
      },
      invalid: {
        iconColor: "#ff0000",
        color: "#ff0000",
      },
      backgroundColor: "#f0f0f0",
      border: "1px solid #000",
    },
  };

  return (
    <form
      className="stripe-form"
      style={{ marginTop: "10rem", marginBottom: "5rem" }}
      onSubmit={handleSubmit}
    >
      <div className="card-elements">
        <div className="card">
          <div className="card-number">
            <label>Card Number</label>
            <CardNumberElement
              className="card-number-input"
              onChange={handleCardNumberChange}
              options={element}
            />
          </div>
          {cardType === "visa" && (
            <img
              src={visaCard}
              alt="visa card"
              style={{ width: "30px", height: "30px" }}
            />
          )}
          {cardType === "mastercard" && (
            <img
              src={masterCard}
              alt="master card"
              style={{ width: "40px", height: "30px" }}
            />
          )}
        </div>
        <div className="card-expiry">
          <label>Expiry</label>
          <CardExpiryElement className="card-expiry-input" options={element} />
        </div>
        <div className="card-cvc">
          <label>Cvc</label>
          <CardCvcElement className="card-cvc-input" options={element} />
        </div>
      </div>
      <button type="submit" disabled={!stripe}>
        Pay {`$${total + delivery}`}
      </button>
    </form>
  );
}

export default CheckoutForm;
