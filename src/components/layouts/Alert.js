import React, { useEffect, Fragment, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { ErrorContext } from "../../context/ErrorContext";
import { MessageContext } from "../../context/MessageContext";

function Alert() {
  const { message } = useContext(MessageContext);
  const { error } = useContext(ErrorContext);

  const notifyMessage = useCallback(() => {
    if (message.addToCart) toast.success(message.addToCart);
    if (message.deleteCart) toast.success(message.deleteCart);
    if (message.message) toast.success(message.message);
    if (message.paymentSucceeded) toast.success(message.paymentSucceeded);
    if (message.paymentFailed) toast.error(message.paymentFailed);
    if (message.passwordNotMatch) toast.error(message.passwordNotMatch);
  }, [
    message.addToCart,
    message.deleteCart,
    message.passwordNotMatch,
    message.message,
  ]);

  const notifyError = useCallback(() => {
    if (error.msg.name) {
      toast.error(`Name: ${error.msg.name.join()}`);
    }
    if (error.msg.email) {
      toast.error(`Email: ${error.msg.email.join()}`);
    }
    if (error.msg.message) {
      toast.error(`Message: ${error.msg.message.join()}`);
    }
    if (error.msg.non_field_errors) {
      toast.error(error.msg.non_field_errors.join());
    }
    if (error.msg.username) {
      toast.error(error.msg.username.join());
    }
  }, [
    error.msg.name,
    error.msg.email,
    error.msg.message,
    error.msg.non_field_errors,
    error.msg.username,
  ]);

  useEffect(() => {
    notifyError();
  }, [error, notifyError]);

  useEffect(() => {
    notifyMessage();
  }, [message, notifyMessage]);
  return <Fragment />;
}

export default Alert;
