import axios from "axios";

import {
  getCurrentUserToken,
  getCurrentUserId,
  firebaseEmailUpdate,
} from "../firebase";

//User requests and functions
export async function registerInApi(userData, uid) {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_URL}users/register`,
    data: {
      firebase_id: uid,
      ...userData,
    },
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}

export async function getById(uid, userToken) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${uid}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
export async function getByEmail(email) {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-email/${email}`,
  });
}

export async function getCurrentUser() {
  const userToken = await getCurrentUserToken();
  const userId = await getCurrentUserId();
  const { data } = await getById(userId, userToken);
  const { currentUser } = data;
  return currentUser;
}

export async function getMyTracksByUserId(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/my-tracks`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getFavouriteTracksByUserId(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/favourite-tracks`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateById(id, userToken, bodyReq) {
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_URL}users/update-user/${id}`,
    data: bodyReq,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateCurrentUser(state) {
  const { userId, ...bodyReq } = state;
  const { email } = bodyReq;
  const userToken = await getCurrentUserToken();
  // const userId = await getCurrentUserId();
  if (email !== "") {
    await firebaseEmailUpdate(email);
    await updateById(userId, userToken, bodyReq);
  }
}

export async function setIsActive(isActive) {
  const userToken = await getCurrentUserToken();
  const { user_id } = decodeToken(userToken);
  const { data } = await getById(user_id, userToken);
  const { _id } = data.currentUser;
  if (isActive) {
    updateById(_id, userToken, { active: true });
  } else {
    updateById(_id, userToken, { active: false });
  }
}

function decodeToken(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

//Tracks requests and functions
export async function getAllTracks() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getMostLikedTracks() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-most-liked`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getMostPlayedTracks() {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-most-played`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
