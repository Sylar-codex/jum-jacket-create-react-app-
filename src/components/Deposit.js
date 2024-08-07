import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import useWalletState from "../hooks/walletHook";
import axios from "axios";
import { WalletContext } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { PAYMENT_SUCCESS } from "../actions/types";
import useCartState from "../hooks/cartHooks";
import "../css/deposit.css";

function Deposit() {
  const { updateCart, carts, getCarts } = useCartState();
  const { auth } = useContext(AuthContext);
  const { dispatchWallet } = useContext(WalletContext);
  const { wallet } = useWalletState();

  useEffect(() => {
    getCarts();
  }, []);

  const url = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  //confirm payment
  const confirmFunc = () => {
    carts.carts.forEach((cart) => {
      updateCart(cart.id, { paid: true });
    });
  };
  const verify = async () => {
    await axios
      .get(
        `${url}/api/deposit/verify/${wallet.deposit.reference}/`,
        tokenConfig(auth)
      )
      .then((res) => {
        if (res.data.data.log.success) {
          dispatchWallet({ type: PAYMENT_SUCCESS });
          confirmFunc();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-deposit">
      <button
        onClick={() => {
          verify();
        }}
      >
        After successful payment click here
      </button>
    </div>
  );
}

export default Deposit;
