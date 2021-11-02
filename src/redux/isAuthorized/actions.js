import { FETCH_STATE_IS_AUTHORIZED, RESET_STATE_IS_AUTHORIZED } from "./types";

import { authenticationObserver } from "../../services/firebase";

export const fetchStateIsAuthorized = () => {
  return async (dispatch) => {
    authenticationObserver((user) => {
      if (user) {
        dispatch({ type: FETCH_STATE_IS_AUTHORIZED, payload: true });
      } else {
        dispatch({ type: FETCH_STATE_IS_AUTHORIZED, payload: false });
      }
    });
  };
};

export const resetStateIsAuthorized = () => ({
  type: RESET_STATE_IS_AUTHORIZED,
});
