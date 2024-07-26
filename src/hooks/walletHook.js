import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import axios from "axios";
import { MAKE_DEPOSIT } from "../actions/types";
import { useNavigate } from "react-router-dom";

const useWalletState = () => {
  const { wallet, dispatchWallet } = useContext(WalletContext);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const url = process.env.REACT_APP_BASE_URL;

  const make_deposit = async (depo) => {
    await axios
      .post(`${url}/api/deposit`, depo, tokenConfig(auth))
      .then((res) => {
        dispatchWallet({ type: MAKE_DEPOSIT, payload: res.data.data });
      });
  };

  const makePaymentStripe = async (amount) => {
    await axios
      .post(`${url}/api/deposit_stripe`, amount, tokenConfig(auth))
      .then((res) => {
        const encodedSecret = btoa(res.data.client_secret);
        navigate(`/checkout/${encodedSecret}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    wallet,
    make_deposit,
    makePaymentStripe,
  };
};

export default useWalletState;
