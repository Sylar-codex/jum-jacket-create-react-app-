import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductState from "../hooks/productHooks";
import useCartState from "../hooks/cartHooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { decrementCount, incrementCount } from "../utils/utils";
import { checkCart } from "../utils/addToCart";
import useAuthState from "../hooks/authHook";

function ProductPage() {
  const { products, getProducts } = useProductState();
  const { addCart, getCarts, carts, addToCart } = useCartState();
  const { auth } = useAuthState();
  const { isAuthenticated } = auth;

  const [productInfo, setProductInfo] = useState({
    product_name: "",
    image: "",
    category: "",
    price: 0,
    count: 1,
    description: "",
  });

  const { productName } = useParams();

  useEffect(() => {
    getCarts();
    getProducts();
  }, []);

  useEffect(() => {
    products.products.forEach((product) => {
      if (product.product_name === productName) {
        setProductInfo({
          product_name: product.product_name,
          image: product.image,
          price: product.price,
          count: product.count,
          category: product.category,
          description: product.description,
        });
      }
    });
  }, [productName]);

  return (
    <div className="product-page">
      <div className="product-page-img">
        <LazyLoadImage src={productInfo.image} alt="product" />
      </div>
      <div className="prod-info-name-desc">
        <h3>{productInfo.product_name}</h3>
        <p className="prod-info-price">
          {"Price:  ₦ " + productInfo.price.toLocaleString()}
        </p>
        <div className="prod-page-qty">
          <h3>Quantity</h3>
          <div className="prod-page-qty-counter">
            <p
              onClick={() => {
                decrementCount(setProductInfo, productInfo, productInfo.count);
              }}
            >
              -
            </p>
            <p>{productInfo.count}</p>
            <p
              onClick={() => {
                incrementCount(setProductInfo, productInfo, productInfo.count);
              }}
            >
              +
            </p>
          </div>
        </div>
        <div className="prod-info-desc">
          <h3>About this item</h3>
          <p>
            {productInfo.description.split("_").map((desc) => (
              <p>{desc}</p>
            ))}
          </p>
        </div>
        <button
          className="prod-page-add-cart-btn"
          onClick={() => {
            checkCart(addCart, productInfo, carts, isAuthenticated, addToCart);
          }}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
