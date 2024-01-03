import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./Product";
import MainCart from "./userProfile/MainCart";
import BillingForm from "./userProfile/BillingForm";
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Ordered from "./userProfile/Ordered";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import useAuthState from "../hooks/authHook";
import Deposit from "./Deposit";
import Alert from "./layouts/Alert";
import PrivateRoutes from "./common/PrivateRoutes";
import ProductPage from "./ProductPage";
import EmailPasswordReset from "./accounts/EmailPasswordReset";
import ResetPassword from "./accounts/ResetPassword";

function App() {
  const { auth, loadUser } = useAuthState();
  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);
  return (
    <Fragment>
      <Header />
      <Alert />
      <Routes>
        <Route path="/" exact element={<Product />} />
        <Route path="/product/:productName" element={<ProductPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/orders" element={<Ordered />} />
          <Route path="/billing-form" element={<BillingForm />} />
          <Route path="/deposit" element={<Deposit />} />
        </Route>
        <Route path="/carts" element={<MainCart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-reset" element={<EmailPasswordReset />} />
        <Route
          path="/reset-passowrd/:uidb64/:token"
          element={<ResetPassword />}
        />
      </Routes>
      <Footer />
    </Fragment>
  );
}
export default App;
