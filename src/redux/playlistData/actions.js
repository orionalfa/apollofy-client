import {
  // IS_PLAY_BAR_DISPLAYED,
  // SET_POSITION_IN_HISTORY,
  PLAYLIST_OBJECT,
  RELOAD_PLAYLIST_FETCH,
} from "./type";

//Music Player
// export const isPlayBarDisplayedAction = (value) => ({
//   type: IS_PLAY_BAR_DISPLAYED,
//   payload: value,
// });

// export const setPositionInHistory = (value) => ({
//   type: SET_POSITION_IN_HISTORY,
//   payload: value,
// });

export const playlistObjectAction = (value) => ({
  type: PLAYLIST_OBJECT,
  payload: value,
});

export const reloadPlaylistFetchAction = (value) => ({
  type: RELOAD_PLAYLIST_FETCH,
  payload: value,
});
