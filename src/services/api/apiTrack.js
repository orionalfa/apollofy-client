import axios from "axios";

import { getCurrentUserToken } from "../firebase";

//PATCH
export async function likeHandleRequest(userId, trackId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_URL}tracks/handle-track-like/`,
    data: {
      userId: userId,
      trackId: trackId,
    },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

//GET
export async function getTrackById(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track/${id}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getTracksByTitle(query) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track-by-title/${query}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getTracksByAuthor(query) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track-by-author/${query}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getTracksByAlbum(query) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track-by-album/${query}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getTracksByGenre(query) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track-by-genre/${query}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
