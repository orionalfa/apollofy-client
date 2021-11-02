import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";
import Track from "../../components/Track";
import Playlist from "../../components/Playlist";
import { Container } from "react-bootstrap";

import {
  getMyTracksByUserId,
  getFavouriteTracksByUserId,
} from "../../services/api/apiAuth";

import {
  getAllMyFavPlaylists,
  getAllMyPlaylists,
} from "../../services/api/apiUser";

// List types
const MY_TRACKS = "/my-tracks";
const FAVOURITE_TRACKS = "/favourite-tracks";
const HISTORY_TRACKS = "/history-tracks";
const QUEUE_TRACKS = "/queue-tracks";
const MY_PLAYLISTS = "/my-playlists";
const FAVOURITE_PLAYLISTS = "/favourite-playlists";

function ElementsList() {
  // To check the current page
  const { location } = useHistory();
  const { pathname } = location;

  // To check the userId
  const { data } = useSelector((state) => state.userReducer);
  const { userId } = data;
  const [listType, setListType] = useState("");
  const [dataToRender, setDataToRender] = useState([]);

  // Playlist fetch
  async function fetchPlaylistsToRender(playlistType, userId) {
    // Initialize playlists to render
    let playlistsToRender = [];

    // Filter by playlist type
    if (playlistType === "favPlaylists") {
      const { data } = await getAllMyFavPlaylists(userId);
      playlistsToRender = data.favPlaylists;
    } else if (playlistType === "myPlaylists") {
      const { data } = await getAllMyPlaylists(userId);
      playlistsToRender = data.myPlaylists;
    }
    return playlistsToRender;
  }

  // Fetch calls to set dataToRender
  async function fetchTracks() {
    if (pathname === MY_TRACKS) {
      const { data } = await getMyTracksByUserId(userId);
      setDataToRender(data.data);
    } else if (pathname === FAVOURITE_TRACKS) {
      const { data } = await getFavouriteTracksByUserId(userId);
      setDataToRender(data.data);
    } else if (pathname === HISTORY_TRACKS) {
      const historyTracks = JSON.parse(localStorage.getItem("trackHistory"));
      setDataToRender(historyTracks ? historyTracks : []);
    } else if (pathname === QUEUE_TRACKS) {
      const queueTracks = JSON.parse(localStorage.getItem("trackQueue"));
      setDataToRender(queueTracks ? queueTracks : []);
    } else if (pathname === FAVOURITE_PLAYLISTS) {
      const favPlaylists = await fetchPlaylistsToRender("favPlaylists", userId);
      setDataToRender(favPlaylists);
    } else if (pathname === MY_PLAYLISTS) {
      const myPlaylists = await fetchPlaylistsToRender("myPlaylists", userId);
      setDataToRender(myPlaylists);
    }
  }

  //Render function
  function renderData() {
    if (dataToRender.length > 0) {
      if (dataToRender[0]["tracks"] !== undefined) {
        return dataToRender.map((playlist, index) => (
          <Playlist
            playlistData={playlist}
            key={playlist ? playlist._id : index}
          />
        ));
      } else {
        return dataToRender.map((track, index) => (
          <Track dataTrack={track} key={track ? track._id : index} />
        ));
      }
    } else {
      return (
        <>
          <div>There are no tracks or playlists</div>
        </>
      );
    }
    // } else {
    //   return dataToRender.map((track) => <Track dataTrack={track} />);
    // }
  }

  useEffect(() => {
    if (pathname === MY_TRACKS) {
      fetchTracks();
      setListType(MY_TRACKS);
    } else if (pathname === FAVOURITE_TRACKS) {
      fetchTracks();
      setListType(FAVOURITE_TRACKS);
    } else if (pathname === HISTORY_TRACKS) {
      fetchTracks();
      setListType(HISTORY_TRACKS);
    } else if (pathname === QUEUE_TRACKS) {
      fetchTracks();
      setListType(QUEUE_TRACKS);
    } else if (pathname === FAVOURITE_PLAYLISTS) {
      fetchTracks();
      setListType(FAVOURITE_PLAYLISTS);
    } else if (pathname === MY_PLAYLISTS) {
      fetchTracks();
      setListType(MY_PLAYLISTS);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Container>
        {listType === MY_TRACKS && <h1>My tracks</h1>}
        {listType === FAVOURITE_TRACKS && <h1>Favourite tracks</h1>}
        {listType === HISTORY_TRACKS && <h1>History</h1>}
        {listType === QUEUE_TRACKS && <h1>Queue</h1>}
        {listType === MY_PLAYLISTS && <h1>My Playlists</h1>}
        {listType === FAVOURITE_PLAYLISTS && <h1>Favourite Playlists</h1>}
        {renderData()}
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(ElementsList));
