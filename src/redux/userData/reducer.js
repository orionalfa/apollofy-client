import initialState from "./state";
import { FETCH_USER_DATA, RESET_USER_DATA } from "./types";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return { ...state, data: action.payload, loaded: true };
    case RESET_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
