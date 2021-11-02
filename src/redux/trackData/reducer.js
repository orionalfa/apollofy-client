import initialTrackState from "./state";
import {
  IS_PLAY_BAR_DISPLAYED,
  TRACK_OBJECT,
  SET_POSITION_IN_HISTORY,
  RELOAD_FETCH,
} from "./type";

const trackReducer = (state = initialTrackState, action) => {
  switch (action.type) {
    case IS_PLAY_BAR_DISPLAYED:
      return { ...state, isPlayBarDisplayed: action.payload };
    case TRACK_OBJECT:
      return { ...state, trackObject: action.payload };
    case SET_POSITION_IN_HISTORY:
      return { ...state, positionInHistory: action.payload };
    case RELOAD_FETCH:
      return { ...state, reloadFetch: action.payload };
    default:
      return state;
  }
};

export default trackReducer;
