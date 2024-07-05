import React, { useEffect } from "react";
import "../../css/cart.css";
import { increment, decrement } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Cart({
  carts,
  getCarts,
  deleteCart,
  updateCart,
  getTotal,
  total,
  updateToCart,
  deleteFromCart,
  isAuthenticated,
  getGuestCart,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getCarts();
    if (!isAuthenticated) {
      getGuestCart();
    }
  }, []);

  const delivery = 1500;

  useEffect(() => {
    getTotal(carts.carts);
  }, [getTotal]);

  return (
    <div>
      {carts.carts.length < 1 ? (
        <div className="cart-page-empty">
          <p>
            sorry your cart is empty :({" "}
            <span>
              <Link to="/">Go back to shop</Link>
            </span>
          </p>
        </div>
      ) : (
        <div className="cart-page">
          <div>
            <div className="cart-header">
              <h3>My Cart</h3>
            </div>
            {carts.carts.map((cart) => (
              <div className="cart-page-info" key={cart.id}>
                <div className="cart-img-name-div">
                  <div className="cart-page-img">
                    <LazyLoadImage src={cart.image} alt="carts" />
                  </div>
                  <div className="cart-name-price">
                    <p>{cart.product_name}</p>
                    <p>{"₦ " + cart.price_naira.toLocaleString()}</p>
                  </div>
                </div>
                <div className="cart-prod-total-div">
                  <div className="qty-div">
                    <p
                      onClick={() => {
                        decrement(
                          updateCart,
                          cart.id,
                          carts,
                          updateToCart,
                          isAuthenticated
                        );
                      }}
                    >
                      -
                    </p>
                    <p>{cart.count}</p>
                    <p
                      onClick={() => {
                        increment(
                          updateCart,
                          cart.id,
                          carts,
                          updateToCart,
                          isAuthenticated
                        );
                      }}
                    >
                      +
                    </p>
                  </div>
                  <div className="cart-qty-tot">
                    <p>
                      {"₦ " + (cart.price_naira * cart.count).toLocaleString()}
                    </p>
                  </div>
                  <div className="remove-cart">
                    <button
                      onClick={() => {
                        isAuthenticated
                          ? deleteCart(cart.id)
                          : deleteFromCart(cart.id);
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order summary */}
          <div className="order-summary">
            <div className="order-summary-header">
              <h3>Order Summary</h3>
            </div>
            <div className="sub-total-div">
              <div className="sub-total">
                <p>subtotal</p>
                <p>{"₦ " + total.toLocaleString()}</p>
              </div>
              <div className="delivery">
                <p>delivery</p>
                <p>{"₦ " + delivery.toLocaleString()}</p>
              </div>
            </div>
            <div className="final-total">
              <div className="total">
                <p>Total</p>
                <p>{"₦ " + (total + delivery).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/billing-form");
                }}
              >
                proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

// {
//  <div className="cart-page-empty">
// {carts.carts.length < 1 ? (
//   <div>
//     <p>
//       sorry your cart is empty :({" "}
//       <span>
//         <Link to="/">Go back to shop</Link>
//       </span>
//     </p>
//   </div>
// }
// // </div>
