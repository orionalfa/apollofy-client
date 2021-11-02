import { SHOW_DIALOGUE, HIDE_DIALOGUE, SHOW_DIALOGUE_PLAYLIST } from "./types";
import initialState from "./state";

const dialogueHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOGUE:
      return {
        ...state,
        active: true,
        trackDataDialog: action.payload.data,
        position: action.payload.position,
      };
    case SHOW_DIALOGUE_PLAYLIST:
      return {
        ...state,
        activePlaylist: true,
        trackDataDialogPlaylist: action.payload.data,
        position: action.payload.position,
      };
    case HIDE_DIALOGUE:
      return initialState;
    default:
      return state;
  }
};

export default dialogueHandlerReducer;
