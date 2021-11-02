// React imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

// HOC
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

// Components
import Track from "../../components/Track";
import Playlist from "../../components/Playlist";
import Input from "../../components/Input";
import { SearchOutlined } from "@material-ui/icons";

// Reducer actions
import { setSearchQuery } from "../../redux/searchHandler/actions";

// Fetch Requests
import {
  getTracksByTitle,
  getTracksByAuthor,
  getTracksByAlbum,
  getTracksByGenre,
  getPlaylistByTitle,
  getPlaylistsByUsername,
  getPlaylistByTrackTitle,
  getPlayListsByGenre,
} from "../../services/api/index";

function Search() {
  // Redux vars
  const { query } = useSelector((state) => state.searchHandler);
  const dispatch = useDispatch();

  // State vars
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchPlaylists, setSearchPlaylists] = useState([]);
  const [timer, setTimer] = useState("");
  const [searchingTracks, setSearchingTracks] = useState(false);
  const [searchingPlaylists, setSearchingPlaylists] = useState(false);

  // Input handler
  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (query.length > 0) {
      setIsEmpty(false);
      setSearchingTracks(true);
      setSearchingPlaylists(true);

      const timeoutId = setTimeout(() => {
        //Tracks and playlists fetch  array
        let tracksFetch = [];
        let playlistsFetch = [];

        //Get tracks by title
        getTracksByTitle(query).then((response) => {
          const tracksByName = response.data.tracks;
          tracksFetch = tracksByName;

          //Get tracks by author
          getTracksByAuthor(query).then((response) => {
            const tracksByAuthor = response.data.tracks;
            tracksFetch = tracksFetch.concat(tracksByAuthor);

            //Get tracks by title
            getTracksByAlbum(query).then((response) => {
              const tracksByAlbum = response.data.tracks;
              tracksFetch = tracksFetch.concat(tracksByAlbum);

              //Get tracks by author
              getTracksByGenre(query).then((response) => {
                const tracksByGenre = response.data.tracks;
                tracksFetch = tracksFetch.concat(tracksByGenre);

                // Filter duplicated tracks
                var result = tracksFetch.reduce((unique, o) => {
                  if (!unique.some((obj) => obj._id === o._id)) {
                    unique.push(o);
                  }
                  return unique;
                }, []);

                // set tracks to render without success fear and
                // searchingTracks to false
                setSearchTracks(result);
                setSearchingTracks(false);
              });
            });
          });
        });

        //Get playlists by title
        getPlaylistByTitle(query).then((response) => {
          const playlistsByName = response.data.playlists;
          playlistsFetch = playlistsByName;
          // console.log("playlistsFetch => ", playlistsFetch);

          //Get playlists by username
          getPlaylistsByUsername(query).then((response) => {
            const playlistsByUsername = response.data.playlists;
            playlistsFetch = playlistsFetch.concat(playlistsByUsername);
            // console.log("playlistsFetch => ", playlistsFetch);

            //Get playlists by track title
            getPlaylistByTrackTitle(query).then((response) => {
              const playlistsByUsername = response.data.playlists;
              playlistsFetch = playlistsFetch.concat(playlistsByUsername);
              // console.log("playlistsFetch => ", playlistsFetch);

              //Get playlists by genre
              getPlayListsByGenre(query).then((response) => {
                const playlistsByUsername = response.data.playlists;
                playlistsFetch = playlistsFetch.concat(playlistsByUsername);
                // console.log("playlistsFetch => ", playlistsFetch);

                // Filter duplicated playlists
                let playlistsResult = playlistsFetch.reduce((unique, o) => {
                  if (!unique.some((obj) => obj._id === o._id)) {
                    unique.push(o);
                  }
                  return unique;
                }, []);

                // console.log("playlistsResult => ", playlistsResult);
                setSearchPlaylists(playlistsResult);
                setSearchingPlaylists(false);
              });
            });
          });
        });
      }, 1000);

      setTimer(timeoutId);
    } else {
      setIsEmpty(true);
      setSearchTracks([]);
      setSearchPlaylists([]);
    }
    // eslint-disable-next-line
  }, [query]);

  return (
    <main>
      <Container>
        <Row xs={2} md={4} lg="auto">
          <Col>
            <SearchOutlined fontSize="large" />
          </Col>
          <Col>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                type="text"
                id="searchQuery"
                label=""
                value={query}
                placeholder="Type your search"
                handleChange={handleChange}
              />
            </form>
          </Col>
        </Row>
        {isEmpty ? (
          <h1>Start your search</h1>
        ) : (
          [
            searchingTracks === true || searchingPlaylists === true ? (
              <h1>Searching...</h1>
            ) : (
              <>
                <Row>
                  <h1>Tracks</h1>
                  {searchTracks.length > 0 ? (
                    searchTracks.map((track, index) => (
                      <Track dataTrack={track} key={index} />
                    ))
                  ) : (
                    <p>No results</p>
                  )}
                </Row>
                <Row>
                  <h1>Playlists</h1>
                  {searchPlaylists.length > 0 ? (
                    searchPlaylists.map((playlist, index) => (
                      <Playlist playlistData={playlist} key={index} />
                    ))
                  ) : (
                    <p>No results</p>
                  )}
                </Row>
              </>
            ),
          ]
        )}
      </Container>
    </main>
  );
}

export default withAuth(BarsAndModal(Search));
