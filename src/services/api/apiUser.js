import axios from "axios";

import { getCurrentUserToken } from "../firebase";

export async function getTotalPlays(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/total-plays`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getTotalTracks(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/total-tracks`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getAllMyPlaylists(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/my-playlists`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getAllMyFavPlaylists(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/my-fav-playlists`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
