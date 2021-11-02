//React  imports
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Styles
import "./styles.css";

//Components
import TrackImg from "../TrackImg";
import {
  MoreVert,
  PlaylistAddCheckOutlined,
  PlaylistAddOutlined,
} from "@material-ui/icons";

//Reducer actions
import { showDialoguePlaylist } from "../../redux/dialogueHandler/actions";
import {
  reloadPlaylistFetchAction,
  playlistObjectAction,
} from "../../redux/playlistData/actions";

//Requests
import { likeHandleRequest } from "../../services/api/apiPlaylist";

function BlockPlaylist({ playlistData, size = "small" }) {
  const history = useHistory();
  const userData = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  const [isPlaylistLiked, setIsPlaylistLiked] = useState({
    state: false,
    loaded: false,
  });

  useEffect(() => {
    if (playlistData !== undefined) {
      const userIndex = playlistData.totalLikes.indexOf(userData.userId);
      if (userIndex >= 0) setIsPlaylistLiked({ state: true, loaded: true });
      else setIsPlaylistLiked({ state: false, loaded: true });
    }
    // eslint-disable-next-line
  }, []);

  function handleLike() {
    setIsPlaylistLiked({ ...isPlaylistLiked, loaded: false });
    likeHandleRequest(userData.userId, playlistData._id)
      .then(() => {
        setIsPlaylistLiked({ state: !isPlaylistLiked.state, loaded: true });
        dispatch(reloadPlaylistFetchAction(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function setReduxPlaylistData() {
    dispatch(playlistObjectAction(playlistData));
  }

  function openDialoguePlaylist(e) {
    dispatch(
      showDialoguePlaylist(playlistData, { x: e.clientX, y: e.clientY }),
    );
  }

  function goToMoreInfo() {
    history.push(`/playlist/${playlistData._id}`);
  }

  function renderPlaylistLiked() {
    if (isPlaylistLiked.loaded) {
      if (isPlaylistLiked.state) {
        return (
          <>
            <PlaylistAddCheckOutlined
              onClick={handleLike}
              className="liked-playlist"
            />
          </>
        );
      } else {
        return (
          <>
            <PlaylistAddOutlined onClick={handleLike} />
          </>
        );
      }
    } else {
      if (isPlaylistLiked.state) {
        return (
          <>
            <PlaylistAddCheckOutlined className="like-disabled" />
          </>
        );
      } else {
        return (
          <>
            <PlaylistAddOutlined className="like-disabled" />
          </>
        );
      }
    }
  }

  if (playlistData !== undefined) {
    return (
      <Container
        className={"block-playlist-background block-playlist-container-" + size}
      >
        <Row
          className="block-playlist-img-container"
          onClick={setReduxPlaylistData}
        >
          {playlistData.tracks.length === 0 ? (
            <TrackImg urlCover={""} />
          ) : (
            <TrackImg urlCover={playlistData.tracks[0].urlCover} />
          )}
        </Row>
        <Row className="name-TrackBlock">
          <Col xs={8}>
            <p className="block-playlist-title pointer" onClick={goToMoreInfo}>
              {playlistData.title}
            </p>
            <p className="block-playlist-owner">
              {playlistData.owner.username}
            </p>
          </Col>
          <Col xs={3}>
            {renderPlaylistLiked()}
            <MoreVert onClick={openDialoguePlaylist} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <>
        <Container
          className={
            "block-playlist-container-" + size + " is-loading-component"
          }
        />
      </>
    );
  }
}

export default BlockPlaylist;
