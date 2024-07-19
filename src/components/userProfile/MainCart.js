import React, { Fragment, useContext } from "react";
import useCartState from "../../hooks/cartHooks";
import useAuthState from "../../hooks/authHook";
import Cart from "./Cart";
import { RegionContext } from "../../context/RegionContext";

function Profile() {
  const { auth } = useAuthState();
  const { isAuthenticated } = auth;
  const { region } = useContext(RegionContext);
  const {
    carts,
    getCarts,
    deleteCart,
    updateCart,
    getTotal,
    total,
    updateToCart,
    deleteFromCart,
    getGuestCart,
  } = useCartState();
  return (
    <Fragment>
      <Cart
        carts={carts}
        getCarts={getCarts}
        deleteCart={deleteCart}
        updateCart={updateCart}
        getTotal={getTotal}
        total={total}
        updateToCart={updateToCart}
        deleteFromCart={deleteFromCart}
        isAuthenticated={isAuthenticated}
        getGuestCart={getGuestCart}
        region={region}
      />
    </Fragment>
  );
}

export default Profile;
