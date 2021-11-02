import initialPlaylistState from "./state";
import {
  // IS_PLAY_BAR_DISPLAYED,
  // SET_POSITION_IN_HISTORY,
  PLAYLIST_OBJECT,
  RELOAD_PLAYLIST_FETCH,
} from "./type";

const playlistReducer = (state = initialPlaylistState, action) => {
  switch (action.type) {
    // case IS_PLAY_BAR_DISPLAYED:
    //   return { ...state, isPlayBarDisplayed: action.payload };
    // case SET_POSITION_IN_HISTORY:
    //   return { ...state, positionInHistory: action.payload };
    case PLAYLIST_OBJECT:
      return { ...state, playlistObject: action.payload };
    case RELOAD_PLAYLIST_FETCH:
      return { ...state, reloadPlaylistFetch: action.payload };
    default:
      return state;
  }
};

export default playlistReducer;
