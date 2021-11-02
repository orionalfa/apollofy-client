import { FETCH_USER_DATA, RESET_USER_DATA } from "./types";

export const fetchUserData = (user) => ({
  // return async (dispatch) => {
  //   getCurrentUser().then((response) => {
  //     console.log("dfetch user data res", response);

  //     dispatch({
  type: FETCH_USER_DATA,
  payload: {
    userId: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    birthday: user.birthday,
    country: user.country,
    profileImg: user.profileImg,
  },
  // });
});

export const resetUserData = () => ({ type: RESET_USER_DATA });