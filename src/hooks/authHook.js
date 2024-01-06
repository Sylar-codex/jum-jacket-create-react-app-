import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import { ErrorContext } from "../context/ErrorContext";
import { returnError } from "../actions/messages";
import { createMessage } from "../actions/messages";
import { MessageContext } from "../context/MessageContext";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  FORM_SUBMISSION,
  SUBMISSION_SUCCESS,
} from "../actions/types";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchError } = useContext(ErrorContext);
  const { dispatchMessage } = useContext(MessageContext);

  const url = process.env.REACT_APP_BASE_URL;

  const loadUser = async () => {
    //user loading
    dispatchAuth({ type: USER_LOADING });
    await axios
      .get(`${url}/api/auth/user`, tokenConfig(auth))
      .then((res) => {
        dispatchAuth({ type: USER_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: AUTH_ERROR });
        console.log("error-auth", err);
      });
  };

  const login = async (username, password) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    dispatchAuth({ type: FORM_SUBMISSION });
    dispatchAuth({ type: USER_LOADING });
    await axios
      .post(`${url}/api/auth/login`, body, config)
      .then((res) => {
        dispatchAuth({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: LOGIN_FAIL });

        dispatchError(returnError(err.response.data, err.response.status));
      });
  };
  const register = async ({
    username,
    first_name,
    last_name,
    password,
    email,
  }) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username,
      first_name,
      last_name,
      password,
      email,
    });
    await axios
      .post(`${url}/api/auth/register`, body, config)
      .then((res) => {
        dispatchAuth({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: REGISTER_FAIL });
        dispatchError(returnError(err.response.data, err.response.status));
      });
  };
  const logout = async () => {
    await axios
      .post(`${url}/api/auth/logout`, null, tokenConfig(auth))
      .then(() => {
        dispatchAuth({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatchError(returnError(err.response.data, err.response.status));
      });
  };

  // reset email
  const resetEmail = async (email) => {
    dispatchAuth({ type: FORM_SUBMISSION });
    await axios
      .post(`${url}/api/request-reset-email`, { email })
      .then((res) => {
        console.log(res.data.message);
        dispatchMessage(createMessage({ message: res.data.message }));
        dispatchAuth({ type: SUBMISSION_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // reset password

  const resetPassword = async (body) => {
    console.log(body);
    dispatchAuth({ type: FORM_SUBMISSION });
    await axios
      .patch(`${url}/api/password-reset-complete`, body)
      .then((res) => {
        console.log(res.data.message);
        dispatchMessage(createMessage({ message: res.data.message }));
        dispatchAuth({ type: SUBMISSION_SUCCESS });
      });
  };

  return {
    loadUser,
    login,
    register,
    logout,
    auth,
    resetEmail,
    resetPassword,
  };
};

export default useAuthState;
