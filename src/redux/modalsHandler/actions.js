import {
  SET_UPLOAD_TRACK_MODAL,
  SET_UPDATE_TRACK_MODAL,
  SET_DELETE_TRACK_MODAL,
  SET_MY_PLAYLIST_MODAL,
  SET_INFORMATION_MODAL,
  SET_SHARE_MODAL,
} from "./types";

export const setUploadTrackModal = (value) => ({
  type: SET_UPLOAD_TRACK_MODAL,
  payload: value,
});

export const setUpdateTrackModal = (value, data = {}) => ({
  type: SET_UPDATE_TRACK_MODAL,
  payload: { value: value, data: data },
});

export const setDeleteTrackModal = (value, data = {}) => ({
  type: SET_DELETE_TRACK_MODAL,
  payload: { value: value, data: data },
});

export const setMyPlaylistModal = (value, data = {}) => ({
  type: SET_MY_PLAYLIST_MODAL,
  payload: { value: value, data: data },
});

export const setInformationModal = (value, data = {}) => ({
  type: SET_INFORMATION_MODAL,
  payload: { value: value, data: data },
});

export const setShareModal = (value, data = {}) => ({
  type: SET_SHARE_MODAL,
  payload: { value: value, data: data },
});
