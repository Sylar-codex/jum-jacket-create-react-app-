import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { OrderedContext } from "../context/OrderedContext";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import { createMessage } from "../actions/messages";
import { RegionContext } from "../context/RegionContext";
import { MessageContext } from "../context/MessageContext";
import {
  GET_CARTS,
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  GET_ORDERED,
} from "../actions/types";

function useCartState() {
  const [total, setTotal] = useState(0);
  const { dispatchMessage } = useContext(MessageContext);
  const { carts, dispatchCarts } = useContext(CartContext);
  const { ordered, dispatchOrdered } = useContext(OrderedContext);
  const { region } = useContext(RegionContext);

  const { auth } = useContext(AuthContext);

  const url = process.env.REACT_APP_BASE_URL;

  const getCarts = async () => {
    await axios
      .get(`${url}/api/carts/`, tokenConfig(auth))
      .then((res) => {
        const cart = res.data.filter((data) => !data.paid);
        const ordered = res.data.filter((data) => data.paid);
        dispatchOrdered({ type: GET_ORDERED, payload: ordered });
        dispatchCarts({ type: GET_CARTS, payload: cart });
      })
      .catch((err) => console.log(err));
  };
  const addCart = async (cart) => {
    await axios
      .post(`${url}/api/carts/`, cart, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: ADD_CART, payload: res.data });
        dispatchMessage(createMessage({ addToCart: "Added to cart" }));
      })
      .catch((err) => console.log(err));
  };
  const deleteCart = async (id) => {
    await axios
      .delete(`${url}/api/carts/${id}/`, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: DELETE_CART, payload: id });
        dispatchMessage(
          createMessage({ deleteCart: "item has been deleted from  cart" })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCart = async (id, cart) => {
    await axios
      .patch(`${url}/api/carts/${id}/`, cart, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: UPDATE_CART, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // The following functions are to when the user is not authenticated

  const addToCart = (cart) => {
    dispatchCarts({ type: ADD_CART, payload: cart });
    dispatchMessage(createMessage({ addToCart: "Added to cart" }));
  };

  const updateToCart = (cart) => {
    dispatchCarts({ type: UPDATE_CART, payload: cart });
  };

  const deleteFromCart = (id) => {
    dispatchCarts({ type: DELETE_CART, payload: id });
    dispatchMessage(
      createMessage({ deleteCart: "item has been deleted from  cart" })
    );
  };

  const getGuestCart = () => {
    const cart = JSON.parse(localStorage.getItem("carts"));

    if (cart !== null) {
      dispatchCarts({ type: GET_CARTS, payload: cart });
    }
  };
  // the above functions for unauthenticated users ends here

  // get total amount
  const getTotal = (carts) => {
    const resInNGN = carts.reduce((prev, cart) => {
      return prev + cart.price_naira * cart.count;
    }, 0);

    const resInUSD = carts.reduce((prev, cart) => {
      return prev + cart.price_dollar * cart.count;
    }, 0);
    const res = region === "NG" ? resInNGN : resInUSD;

    setTotal(res);
  };

  const sendBillForm = async (form) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify(form);
    console.log(form);
    await axios.post(`${url}/api/billingform/`, body, config).then((res) => {});
  };

  return {
    carts,
    getCarts,
    addCart,
    deleteCart,
    updateCart,
    getTotal,
    total,
    sendBillForm,
    ordered,
    addToCart,
    updateToCart,
    deleteFromCart,
    getGuestCart,
  };
}
export default useCartState;
