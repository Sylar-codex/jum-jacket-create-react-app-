import { GET_PRODUCTS } from "../actions/types";
function productReducer(state, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
export default productReducer;
