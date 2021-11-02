import {
  registerInApi,
  getById,
  getCurrentUser,
  updateCurrentUser,
  updateById,
  setIsActive,
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
  getByEmail,
} from "./apiAuth";

import {
  apiTrackUpload,
  addTotalPlay,
  deleteTrack,
  updateTrack,
} from "./trackManager";

import { changeMyProfilePicture } from "./fileUploader";

import {
  createNewPlaylistApi,
  addTrackToPlaylist,
  deleteTrackFromPlaylistApi,
  getPlaylistById,
  getMostLikedPlaylists,
  getLastUploadedPlaylists,
  getPlaylistByTitle,
  getPlaylistsByUsername,
  getPlaylistByTrackTitle,
  getPlayListsByGenre,
} from "./apiPlaylist";

import {
  postGlobalPlay,
  postRelatedPlay,
  playNextRandomRelated,
  lastSevenHoursPlaysByUser,
  todaysPlays,
} from "./laravelApi";

import {
  getTrackById,
  getTracksByTitle,
  getTracksByAuthor,
  getTracksByAlbum,
  getTracksByGenre,
} from "./apiTrack";

import {
  getAllMyPlaylists,
  getAllMyFavPlaylists,
  getTotalPlays,
  getTotalTracks,
} from "./apiUser";

export {
  registerInApi,
  getById,
  getCurrentUser,
  updateCurrentUser,
  updateById,
  setIsActive,
  apiTrackUpload,
  changeMyProfilePicture,
  getAllTracks,
  getMostLikedTracks,
  getMostPlayedTracks,
  addTotalPlay,
  deleteTrack,
  updateTrack,
  getTrackById,
  getTracksByTitle,
  getTracksByAuthor,
  getTracksByAlbum,
  getTracksByGenre,
  getAllMyPlaylists,
  getPlaylistById,
  getMostLikedPlaylists,
  getLastUploadedPlaylists,
  addTrackToPlaylist,
  createNewPlaylistApi,
  deleteTrackFromPlaylistApi,
  getAllMyFavPlaylists,
  getPlaylistByTitle,
  getPlaylistsByUsername,
  getPlaylistByTrackTitle,
  getPlayListsByGenre,
  getTotalPlays,
  getTotalTracks,
  postGlobalPlay,
  postRelatedPlay,
  playNextRandomRelated,
  getByEmail,
  lastSevenHoursPlaysByUser,
  todaysPlays,
};
