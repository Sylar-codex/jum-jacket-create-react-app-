const checkCart = (addCart, product, carts, isAuthenticated, addToCart) => {
  const check = carts.carts.some(
    (cart) => cart.product_name === product.product_name
  );
  if (!check) {
    if (isAuthenticated) {
      addCart(product);
    } else {
      addToCart(product);
    }
  }
};

export { checkCart };
