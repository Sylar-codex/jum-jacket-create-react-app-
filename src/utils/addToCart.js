const checkCart = (addCart, product, carts) => {
  const check = carts.carts.some(
    (cart) => cart.product_name === product.product_name
  );
  if (!check) {
    addCart(product);
  }
};

export { checkCart };
