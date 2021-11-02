import { SET_QUERY, SUBMIT_SEARCH } from "./types";

export const setSearchQuery = (value) => ({
  type: SET_QUERY,
  payload: value,
});
