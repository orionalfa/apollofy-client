//React imports
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Styles
import "./styles.css";

//Components
import TrackImg from "../TrackImg";
import {
  MoreHoriz,
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

function Playlist({ playlistData }) {
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

  function openDialogue(e) {
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
      <Row
        key={playlistData._id}
        id={playlistData._id}
        className="playlist-row"
      >
        <Col xs={12}>
          <Row>
            <Col xs={2} md={2} lg={2} onClick={setReduxPlaylistData}>
              <div className="playlist-row-img-container">
                {playlistData.tracks.length === 0 ? (
                  <TrackImg urlCover={""} />
                ) : (
                  <TrackImg urlCover={playlistData.tracks[0].urlCover} />
                )}
              </div>
            </Col>
            <Col xs={5} md={5} lg={5}>
              <p className="playlist-title pointer" onClick={goToMoreInfo}>
                {playlistData.title}
              </p>
              <p className="playlist-owner">{playlistData.owner.username}</p>
            </Col>
            <Col
              md={2}
              lg={2}
              className="d-none d-md-block d-lg-block playlist-field-centered playlist-album"
            >
              <p>
                {playlistData.genres.length > 0
                  ? playlistData.genres[0]
                  : playlistData.title}
              </p>
            </Col>
            <Col xs={4} md={3} lg={3} className=" playlist-field-centered">
              <Row>
                <Col xs={4} md={4} lg={4}></Col>
                <Col xs={4} md={4} lg={4}>
                  {renderPlaylistLiked()}
                </Col>
                <Col xs={4} md={4} lg={4}>
                  <MoreHoriz onClick={openDialogue} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row className="playlist-row is-loading-component" />
      </>
    );
  }
}

export default Playlist;
