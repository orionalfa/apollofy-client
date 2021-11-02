import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import {
  PlaylistAddCheckOutlined,
  PlaylistAddOutlined,
  AddBoxOutlined,
  EditOutlined,
  ShareOutlined,
  InfoOutlined,
  DeleteOutline,
  DoneOutlined,
  ClearOutlined,
} from "@material-ui/icons";

// Hoc's
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

// Playlist API
import {
  getPlaylistById,
  likeHandleRequest,
  getIsPlaylistLiked,
  updatePlaylistById,
} from "../../services/api/apiPlaylist";

// Components
import Track from "../../components/Track";
import Input from "../../components/Input";

// Actions Modal Redux
import {
  setInformationModal,
  setShareModal,
  setDeleteTrackModal,
} from "../../redux/modalsHandler/actions";

// Stylesheet
import "./style.css";

function PlaylistView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.userReducer);

  const history = useHistory();

  const [playlistData, setPlaylistData] = useState({
    data: null,
    loaded: false,
  });
  const [playlistImage, setPlaylistImage] = useState(null);
  const [isFollowed, setIsFollowed] = useState({
    state: false,
    loaded: false,
  });
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataEditing, setDataEditing] = useState({});

  useEffect(() => {
    // Fetch playlist data
    getPlaylistById(id)
      .then((resp) => {
        // Save the data
        setPlaylistData({ data: resp.data.currentPlaylist, loaded: true });
        const randomImage = Math.floor(
          Math.random() * resp.data.currentPlaylist.tracks.length,
        );
        // Set the random image
        setPlaylistImage(
          resp.data.currentPlaylist.tracks[randomImage].urlCover,
        );
        // Set the state "isOwner"
        if (resp.data.currentPlaylist.owner._id === userData.userId) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
        // Initial state of dataEditing
        setDataEditing({
          title: resp.data.currentPlaylist.title,
          description: resp.data.currentPlaylist.description,
        });
      })
      .catch((error) => {
        alert(error);
      });

    // Fetch if the playlist is followed
    getIsPlaylistLiked(id, userData.userId)
      .then((resp) => {
        setIsFollowed({ state: resp.data.isLiked, loaded: true });
      })
      .catch((error) => {
        alert(error);
      });
    // eslint-disable-next-line
  }, []);

  function followPlaylistHandler() {
    setIsFollowed({ ...isFollowed, loaded: false });
    likeHandleRequest(userData.userId, id)
      .then(() => {
        setIsFollowed({ state: !isFollowed.state, loaded: true });
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addTrackHandler() {
    history.push("/search");
  }

  function viewOwnerInformation() {
    dispatch(setInformationModal(true, playlistData.data.owner));
  }

  function sharePlaylistHandler() {
    dispatch(
      setShareModal(true, { url: `playlist/${id}` }),
    );
  }

  function editPlaylistHandler() {
    if (isEditing) cancelEditing();
    else setIsEditing(true);
  }

  function handleChange(e) {
    setDataEditing({
      ...dataEditing,
      [e.target.name]: e.target.value,
    });
  }

  function cancelEditing() {
    setIsEditing(false);
    // Reset formulary
    setDataEditing({
      title: playlistData.data.title,
      description: playlistData.data.description,
    });
  }

  function confirmEditing() {
    const dataToUpdate = {
      title: dataEditing.title,
      description: dataEditing.description,
      owner: playlistData.data.owner._id,
      private: playlistData.data.private,
    };

    updatePlaylistById(id, dataToUpdate)
      .then(() => {
        setPlaylistData({
          data: {
            ...playlistData.data,
            title: dataToUpdate.title,
            description: dataToUpdate.description,
          },
          loaded: playlistData.loaded,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deletePlaylistHandler() {
    dispatch(
      setDeleteTrackModal(true, { data: playlistData.data, isTrack: false }),
    );
  }

  if (!playlistData.loaded)
    return (
      <main>
        <h1>Loading Playlist Data...</h1>
      </main>
    );

  return (
    <main>
      <Container>
        <Row>
          <Col xs={5} md={3} lg={2}>
            <div
              className="track-image-component-image"
              style={{ backgroundImage: `url(${playlistImage})` }}
            ></div>
          </Col>
          <Col xs={7} md={9} lg={10}>
            <Row>
              {isEditing ? (
                <Input
                  type="text"
                  id="title"
                  placeholder="Insert a title..."
                  value={dataEditing.title}
                  handleChange={handleChange}
                />
              ) : (
                <h2>{playlistData.data.title}</h2>
              )}
            </Row>
            <Row>
              {isEditing ? (
                <Input
                  type="text"
                  id="description"
                  placeholder="Insert a description..."
                  value={dataEditing.description}
                  handleChange={handleChange}
                />
              ) : (
                <div>
                  {playlistData.data.description === ""
                    ? "There isn't description for this playlist..."
                    : playlistData.data.description}
                </div>
              )}
            </Row>
            {isEditing && (
              <Row>
                <div className="d-flex justify-content-end">
                  <ClearOutlined className="me-3" onClick={cancelEditing} />
                  <DoneOutlined onClick={confirmEditing} />
                </div>
              </Row>
            )}
            <Row className="mt-3">
              <Col xs={12} md={6} lg={8}>
                Genres
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="options-box">
                  {!isFollowed.loaded && isFollowed.state && (
                    <PlaylistAddCheckOutlined className="option-element-playlist-disabled" />
                  )}
                  {!isFollowed.loaded && !isFollowed.state && (
                    <PlaylistAddOutlined className="option-element-playlist-disabled" />
                  )}
                  {isFollowed.loaded && isFollowed.state && (
                    <PlaylistAddCheckOutlined
                      className="option-element-playlist liked-playlist"
                      onClick={followPlaylistHandler}
                    />
                  )}
                  {isFollowed.loaded && !isFollowed.state && (
                    <PlaylistAddOutlined
                      className="option-element-playlist"
                      onClick={followPlaylistHandler}
                    />
                  )}
                  <AddBoxOutlined
                    className="option-element-playlist"
                    onClick={addTrackHandler}
                  />
                  <InfoOutlined
                    className="option-element-playlist owner-information"
                    onClick={viewOwnerInformation}
                  />
                  <ShareOutlined
                    className="option-element-playlist"
                    onClick={sharePlaylistHandler}
                  />
                  {isOwner ? (
                    <>
                      <EditOutlined
                        className="option-element-playlist"
                        onClick={editPlaylistHandler}
                      />
                      <DeleteOutline
                        className="option-element-playlist"
                        onClick={deletePlaylistHandler}
                      />
                    </>
                  ) : (
                    <>
                      <EditOutlined className="option-element-playlist-disabled" />
                      <DeleteOutline className="option-element-playlist-disabled" />
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <h2>Tracks:</h2>
        {playlistData.data &&
          playlistData.data.tracks.map((track, index) => (
            <Track dataTrack={track} key={index} />
          ))}
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(PlaylistView));
