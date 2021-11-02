import { SET_QUERY, SUBMIT_SEARCH } from "./types";
import initialState from "./state";

const searchHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SUBMIT_SEARCH:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchHandlerReducer;
