import React, { useState, useEffect, useContext } from "react";
import useCartState from "../../hooks/cartHooks";
import { useNavigate } from "react-router-dom";
import "../../css/billingForm.css";
import useAuthState from "../../hooks/authHook";
import useWalletState from "../../hooks/walletHook";
import { RegionContext } from "../../context/RegionContext";

function BillingForm() {
  const { total, carts, getTotal, getCarts, sendBillForm, delivery } =
    useCartState();
  const { wallet, make_deposit, makePaymentStripe } = useWalletState();
  const { auth } = useAuthState();
  const { user, isAuthenticated } = auth;

  const { region } = useContext(RegionContext);

  const navigate = useNavigate();

  const [billForm, setBillForm] = useState({
    full_name: "",
    email: "",
    home_address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      setBillForm({
        ...billForm,
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      });
    }
  }, [auth, isAuthenticated]);

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    if (wallet.deposit) {
      window.location.href = wallet.deposit.authorization_url;
    }
  }, [wallet.deposit]);

  useEffect(() => {
    getTotal(carts.carts);
  }, []);

  const handleChange = (e) => {
    setBillForm({ ...billForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, home_address, city, state, country, phone } =
      billForm;
    const use = { full_name, email, home_address, city, state, country, phone };
    sendBillForm(use);
    const depo = { amount: (total + delivery) * 100, email: user.email };

    if (region === "NG") {
      make_deposit(depo);
    } else {
      const { amount } = depo;
      makePaymentStripe({ amount });
    }
    setBillForm({
      full_name: "",
      email: "",
      home_address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
    });
  };

  return (
    <div className="bill-form">
      <div className="form-div">
        <h2>Please fill in the following informations correctly</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter Your Full Name"
              value={billForm.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={billForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Home Address</label>
            <input
              type="text"
              name="home_address"
              placeholder="Enter Your Home Address"
              value={billForm.home_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter Your City"
              value={billForm.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter Your State"
              value={billForm.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Your Country"
              value={billForm.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={billForm.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-form">
            <input type="submit" value="Checkout" />
          </div>
        </form>
      </div>
      {/* order summary */}
      <div className="order-summary-bill">
        <div className="order-summary-header">
          <h3>Order Summary</h3>
        </div>
        <div className="sub-total-div">
          <div className="sub-total">
            <p>subtotal</p>
            <p>{`${region === "NG" ? "₦ " : "$ "}` + total.toLocaleString()}</p>
          </div>
          <div className="delivery">
            <p>delivery</p>
            <p>
              {`${region === "NG" ? "₦ " : "$ "}` + delivery.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="final-total">
          <div className="total">
            <p>Total</p>
            <p>
              {`${region === "NG" ? "₦ " : "$ "}` +
                (total + delivery).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingForm;
