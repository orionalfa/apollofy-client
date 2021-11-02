import {
  IS_PLAY_BAR_DISPLAYED,
  TRACK_OBJECT,
  SET_POSITION_IN_HISTORY,
  RELOAD_FETCH,
} from "./type";

//Reproductor
export const isPlayBarDisplayedAction = (value) => ({
  type: IS_PLAY_BAR_DISPLAYED,
  payload: value,
});

export const trackObjectAction = (value) => ({
  type: TRACK_OBJECT,
  payload: value,
});

export const setPositionInHistory = (value) => ({
  type: SET_POSITION_IN_HISTORY,
  payload: value,
});

export const reloadFetchAction = (value) => ({
  type: RELOAD_FETCH,
  payload: value,
});
