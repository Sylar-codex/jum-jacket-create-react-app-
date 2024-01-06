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

function authReducer(state, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FORM_SUBMISSION:
      return {
        ...state,
        isSubmitting: true,
      };
    case SUBMISSION_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isSubmitting: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
        isSubmitting: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isSubmitting: false,
      };
    default:
      return state;
  }
}

export default authReducer;
