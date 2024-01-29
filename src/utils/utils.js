const increment = (updateCart, id, carts, updateToCart, isAuthenticated) => {
  let counter = 1;
  let cartObj = {};
  carts.carts.forEach((cart) => {
    if (cart.id === id) {
      counter = cart.count + 1;
      cart.count += 1;
      cartObj = cart;
    }
  });
  const use = { count: counter };

  if (isAuthenticated) {
    updateCart(id, use);
  } else {
    updateToCart(cartObj);
  }
};

const decrement = (updateCart, id, carts, updateToCart, isAuthenticated) => {
  let counter = 1;
  let cartObj = {};
  carts.carts.forEach((cart) => {
    if (cart.id === id && cart.count > 1) {
      cart.count = cart.count - 1;
      counter = cart.count;
      cartObj = cart;
    }
  });
  const use = { count: counter };
  if (isAuthenticated) {
    updateCart(id, use);
  } else {
    updateToCart(cartObj);
  }
};

const incrementCount = (setState, state, count) => {
  let ct = count;
  ct = ct + 1;
  setState({ ...state, count: ct });
};

const decrementCount = (setState, state, count) => {
  let ct = count;
  if (count > 1) {
    ct = ct - 1;
  }
  setState({ ...state, count: ct });
};

export { increment, decrement, incrementCount, decrementCount };
