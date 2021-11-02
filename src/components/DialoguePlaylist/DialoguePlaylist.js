import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { hideDialogue } from "../../redux/dialogueHandler/actions";
import { setTrackQueueInLocalStorage } from "../../services/localStorage";
import {
  trackObjectAction,
  isPlayBarDisplayedAction,
  setPositionInHistory,
} from "../../redux/trackData/actions";
import { resetPositionInHistory } from "../../services/localStorage";
import "./styles.css";
import { setShareModal } from "../../redux/modalsHandler/actions";

function DialoguePlaylist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { trackDataDialogPlaylist, position } = useSelector(
    (state) => state.dialogueHandler,
  );

  useEffect(() => {
    dialoguePlaylist.current.style.display = "block";

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dialoguePlaylistHeight = dialoguePlaylist.current.offsetHeight + 20;
    const dialoguePlaylistWidth = dialoguePlaylist.current.offsetWidth + 20;
    const clickedPosX = position.x;
    const clickedPosY = position.y;

    if (windowWidth - clickedPosX < dialoguePlaylistWidth) {
      dialoguePlaylist.current.style.left =
        windowWidth - dialoguePlaylistWidth + "px";
    } else {
      dialoguePlaylist.current.style.left = clickedPosX + "px";
    }

    if (windowHeight - clickedPosY < dialoguePlaylistHeight) {
      dialoguePlaylist.current.style.top =
        windowHeight - dialoguePlaylistHeight + "px";
    } else {
      dialoguePlaylist.current.style.top = clickedPosY + "px";
    }
    // eslint-disable-next-line
  }, []);

  const dialoguePlaylist = useRef();

  function handlerAddToQueuePlaylist() {
    const { tracks } = trackDataDialogPlaylist;
    dispatch(trackObjectAction(tracks[0]));
    if (tracks.length > 1) {
      tracks.shift();
    }
    tracks.map((track) => setTrackQueueInLocalStorage(track));
    dispatch(isPlayBarDisplayedAction(true));

    const resetedHistoryPosition = resetPositionInHistory();
    dispatch(setPositionInHistory(resetedHistoryPosition));
    closeDialoguePlaylist();
  }

  function handlerMoreInfoPlaylist() {
    history.push(`/playlist/${trackDataDialogPlaylist._id}`);
    closeDialoguePlaylist();
  }

  function handlerSharePlaylist() {
    dispatch(
      setShareModal(true, {
        url: `playlist/${trackDataDialogPlaylist._id}`,
      }),
    );
    closeDialoguePlaylist();
  }

  function closeDialoguePlaylist() {
    window.onscroll = () => {};
    dispatch(hideDialogue());
  }

  return (
    <>
      <div onMouseDown={closeDialoguePlaylist} className="back-context"></div>
      <div ref={dialoguePlaylist} className="dialogue-box">
        <ul className="dialogue-list">
          <li className="dialogue-item" onClick={handlerAddToQueuePlaylist}>
            Add to queue
          </li>
          <li className="dialogue-item" onClick={handlerMoreInfoPlaylist}>
            More Info
          </li>
          <li className="dialogue-item" onClick={handlerSharePlaylist}>
            Share
          </li>
        </ul>
      </div>
    </>
  );
}

export default DialoguePlaylist;
