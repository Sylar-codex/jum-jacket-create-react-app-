import React, { createContext, useReducer } from "react";
import productReducer from "../reducers/productReducer";

const ProductContext = createContext();

const { Provider } = ProductContext;

const initialState = {
  products: [],
  isLoading: true,
};

const ProductProvider = ({ children }) => {
  const [products, dispatchProducts] = useReducer(productReducer, initialState);
  return <Provider value={{ products, dispatchProducts }}>{children}</Provider>;
};

export { ProductContext, ProductProvider };
