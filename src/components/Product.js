import React, { useEffect, useState } from "react";
import useProductState from "../hooks/productHooks";
import useCartState from "../hooks/cartHooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { increment, decrement, decrementCount } from "../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/product.css";
import { checkCart } from "../utils/addToCart";
import useAuthState from "../hooks/authHook";

function Product() {
  const navigate = useNavigate();
  const {
    addCart,
    carts,
    total,
    getTotal,
    getCarts,
    updateCart,
    deleteCart,
    addToCart,
    updateToCart,
    deleteFromCart,
    getGuestCart,
  } = useCartState();
  const { auth } = useAuthState();
  const { isAuthenticated } = auth;
  const [info, setInfo] = useState({ price: 0 });
  const [modalInfo, setModalInfo] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const { products, getProducts } = useProductState();

  useEffect(() => {
    getCarts();
    getProducts();
    if (!isAuthenticated) {
      getGuestCart();
    }
  }, []);

  useEffect(() => {
    getTotal(carts.carts);
  }, [getTotal]);

  useEffect(() => {
    const cc = JSON.parse(localStorage.getItem("prod-info"));
    if (cc !== null) {
      setInfo(cc);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prod-info", JSON.stringify(info));
  });

  return (
    <div>
      {products.isLoading ? (
        <div className="loading"></div>
      ) : (
        <div className="product">
          {products.products.map((product) => (
            <div className="prod-disp" key={product.id}>
              <div
                onClick={() => {
                  setModalInfo(true);
                  setInfo(product);
                }}
                className="prod-div-img"
              >
                <LazyLoadImage src={product.image} alt="product" />
              </div>
              <div className="quick">
                <p
                  onClick={() => {
                    setModalInfo(true);
                    setInfo(product);
                  }}
                >
                  Quick view
                </p>
              </div>
              <div className="prod-name">{product.product_name}</div>
              <div className="line"></div>
              <div className="prod-price">
                {"₦ " + product.price.toLocaleString()}
              </div>
              <button
                onClick={() => {
                  checkCart(
                    addCart,
                    product,
                    carts,
                    isAuthenticated,
                    addToCart
                  );
                  setModalCart(true);
                }}
              >
                add to cart
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Modal for product info */}
      {modalInfo && (
        <div className="product-info-modal">
          <div className="prod-info-mod">
            <div
              className="remove-info-mod"
              onClick={() => {
                setModalInfo(false);
              }}
            >
              <FontAwesomeIcon size="xl" icon={faXmark} />
            </div>
            <div className="prod-info-mod-1">
              <div className="prod-info-img">
                <LazyLoadImage src={info.image} />
              </div>
              <div className="prod-info-name-desc">
                <h3>{info.product_name}</h3>
                <p className="prod-info-price">
                  {"Price:  ₦ " + info.price.toLocaleString()}
                </p>
                <div className="prod-info-desc">
                  <p>
                    {info.description
                      .split("_")
                      .slice(3)
                      .map((desc) => (
                        <p>{desc}</p>
                      ))}
                  </p>
                </div>
                <button
                  className="more-info-btn"
                  onClick={() => {
                    navigate(`/product/${info.product_name}`);
                  }}
                >
                  Click for More Info
                </button>
                <button
                  onClick={() => {
                    setModalCart(true);
                    checkCart(addCart, info, carts, isAuthenticated, addToCart);
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Carts */}
      {modalCart && total > 0 && (
        <div className="cart-modal-container">
          <div
            className="empty-mod"
            onClick={() => {
              setModalCart(false);
            }}
          ></div>
          <div className="cart-modal">
            <div className="cart-modal-header">
              <button
                onClick={() => {
                  setModalCart(false);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <h3>Cart</h3>
            </div>
            <div className="cart-mod-info">
              {carts.carts.map((cart) => (
                <div className="cart-mod-info-2" key={cart.id}>
                  <div className="cart-mod-img">
                    <LazyLoadImage src={cart.image} alt="cart" />
                  </div>
                  <div>
                    <div className="cart-mod-name">{cart.product_name}</div>
                    <div className="cart-mod-price">
                      {"₦ " + cart.price.toLocaleString()}
                    </div>
                    <div className="cart-mod-qty">
                      <p
                        onClick={() => {
                          decrement(updateCart, cart.id, carts, updateToCart);
                        }}
                      >
                        -
                      </p>
                      <p>{cart.count}</p>
                      <p
                        onClick={() => {
                          increment(updateCart, cart.id, carts, updateToCart);
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      isAuthenticated
                        ? deleteCart(cart.id)
                        : deleteFromCart(cart.id);
                    }}
                    className="remove-cart-mod"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
              ))}
              <div className="take-space"></div>
            </div>
            <div className="cart-mod-sub-div">
              <div className="cart-mod-sub">
                <h3>Subtotal</h3>
                <h3>{"₦ " + total.toLocaleString()}</h3>
              </div>
              <div className="viewcart-mod">
                <button
                  onClick={() => {
                    navigate("/carts");
                  }}
                >
                  view Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
