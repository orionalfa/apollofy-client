import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.css";

//import dialogueHandlerReducer
import { hideDialogue } from "../../redux/dialogueHandler/actions";

import {
  setUpdateTrackModal,
  setDeleteTrackModal,
  setMyPlaylistModal,
  setShareModal,
} from "../../redux/modalsHandler/actions";

import { setTrackQueueInLocalStorage } from "../../services/localStorage";

function DialogueBox() {
  const dispatch = useDispatch();
  const { trackDataDialog, position } = useSelector(
    (state) => state.dialogueHandler,
  );
  const userData = useSelector((state) => state.userReducer.data);
  const dialogueBox = useRef();

  const [isOwner, setIsOwner] = useState(false);

  const history = useHistory();

  // Set the method to close the dialog when scrolling
  useEffect(() => {
    window.onscroll = () => {
      closeDialogue();
    };
  }, []);

  // Set owner option handler ACORDARSE DE CAMBIAR ESTOS BOOLEANOS, ESTAN HACKEADOS

  useEffect(() => {
    if (userData.userId === trackDataDialog.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  // Set the dialogue box position
  useEffect(() => {
    dialogueBox.current.style.display = "block";

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dialogueBoxHeight = dialogueBox.current.offsetHeight + 20;
    const dialogueBoxWidth = dialogueBox.current.offsetWidth + 20;
    const clickedPosX = position.x;
    const clickedPosY = position.y;

    if (windowWidth - clickedPosX < dialogueBoxWidth) {
      dialogueBox.current.style.left = windowWidth - dialogueBoxWidth + "px";
    } else {
      dialogueBox.current.style.left = clickedPosX + "px";
    }

    if (windowHeight - clickedPosY < dialogueBoxHeight) {
      dialogueBox.current.style.top = windowHeight - dialogueBoxHeight + "px";
    } else {
      dialogueBox.current.style.top = clickedPosY + "px";
    }
  }, []);

  function closeDialogue() {
    window.onscroll = () => {};
    dispatch(hideDialogue());
  }

  function handlerAddToQueue() {
    //Code to add the track to queue
    setTrackQueueInLocalStorage(trackDataDialog);
    // alert(`${trackDataDialog.title} added to queue.`);
    closeDialogue();
  }

  function handlerAddToMyplaylist() {
    //Code to add the track to queue
    dispatch(setMyPlaylistModal(true, trackDataDialog));
    closeDialogue();
  }

  // function handlerMoreInfo() {
  //   alert(`${trackDataDialog._id}`);
  // }

  function handlerEdit() {
    //Code to edit the track
    dispatch(setUpdateTrackModal(true, trackDataDialog));
    closeDialogue();
  }

  function handlerDelete() {
    //Code to delete the track
    dispatch(
      setDeleteTrackModal(true, { data: trackDataDialog, isTrack: true }),
    );
    closeDialogue();
  }

  function handlerShare() {
    //Code to share the track
    dispatch(
      setShareModal(true, {
        url: `track-view/${trackDataDialog._id}`,
      }),
    );
    closeDialogue();
  }

  function handlerMoreInfo() {
    history.push(`/track-view/${trackDataDialog._id}`);
    closeDialogue();
  }

  return (
    <>
      <div onMouseDown={closeDialogue} className="back-context"></div>
      <div ref={dialogueBox} className="dialogue-box">
        <ul className="dialogue-list">
          <li className="dialogue-item" onClick={handlerAddToQueue}>
            Add to queue
          </li>
          <li className="dialogue-item" onClick={handlerMoreInfo}>
            More Info
          </li>
          <li className="dialogue-item" onClick={handlerAddToMyplaylist}>
            Add to MyPlaylist
          </li>
          <li className="dialogue-item" onClick={handlerShare}>
            Share
          </li>
          {isOwner ? (
            <>
              <li className="dialogue-item" onClick={handlerEdit}>
                Edit
              </li>
              <li className="dialogue-item" onClick={handlerDelete}>
                Delete
              </li>
            </>
          ) : (
            <>
              <li className="dialogue-item-disabled">Edit</li>
              <li className="dialogue-item-disabled">Delete</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default DialogueBox;
