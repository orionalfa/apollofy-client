import initialState from "./state";
import { FETCH_STATE_IS_AUTHORIZED, RESET_STATE_IS_AUTHORIZED } from "./types";

const isAuthorizedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATE_IS_AUTHORIZED:
      return { ...state, value: action.payload, loaded: true };
    case RESET_STATE_IS_AUTHORIZED:
      return initialState;
    default:
      return state;
  }
};

export default isAuthorizedReducer;
