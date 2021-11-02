import { SHOW_DIALOGUE, HIDE_DIALOGUE, SHOW_DIALOGUE_PLAYLIST } from "./types";

export const showDialogue = (data, position) => ({
  type: SHOW_DIALOGUE,
  payload: { data, position },
});
export const showDialoguePlaylist = (data, position) => ({
  type: SHOW_DIALOGUE_PLAYLIST,
  payload: { data, position },
});
export const hideDialogue = () => ({ type: HIDE_DIALOGUE });
