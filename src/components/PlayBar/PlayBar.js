import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addTotalPlay,
  postGlobalPlay,
  postRelatedPlay,
  playNextRandomRelated,
  getTrackById,
} from "../../services/api";
import {
  trackObjectAction,
  setPositionInHistory,
  isPlayBarDisplayedAction,
} from "../../redux/trackData/actions";
import {
  setTrackHistoryInLocalStorage,
  resetPositionInHistory,
} from "../../services/localStorage";

import {
  WSLoadNewTrack,
  WSTogglePlayPause,
  WSRewindBackward,
  WSFastForward,
  WSToggleMute,
  WSSetVolume,
  WSDestroyInstance,
} from "../../services/waveSurfer";

import "./styles.css";

//Components and MUI icons
import { Row, Col } from "react-bootstrap";
import TrackImg from "../TrackImg";
// import FavButton from "../FavButton";
import {
  CastOutlined,
  CastConnected,
  PlayArrowOutlined,
  PauseOutlined,
  SkipPreviousOutlined,
  SkipNextOutlined,
  FastForwardOutlined,
  FastRewindOutlined,
  VolumeUpOutlined,
  VolumeOffOutlined,
  Favorite,
  Cancel,
} from "@material-ui/icons";

function PlayBar() {
  //Redux
  const { trackObject, positionInHistory } = useSelector(
    (state) => state.trackReducer,
  );

  const dispatch = useDispatch();

  //State vars
  const [volume, setVolume] = useState(50);
  const [isMute, setIsMute] = useState(false);
  const [isPlayPause, setPlayPause] = useState(true);
  const [isChromeCast, setIsChromecast] = useState(false);
  const [trackProgressTime, setTrackProgressTime] = useState(0);
  const [trackDurationTime, setTrackDurationTime] = useState(0);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);

  // const [waveSurfer, setWaveSurfer] = useState(null);

  // action when new track is loaded
  useEffect(() => {
    setIsTrackLoaded(false);
    WSLoadNewTrack(
      trackObject.urlTrack,
      {
        isMute: isMute,
        volume: volume,
      },
      (duration) => {
        setIsTrackLoaded(true);
        setTrackDurationTime(duration);
        setPlayPause(true);
        setTrackHistoryInLocalStorage(trackObject);
        addTotalPlay(trackObject._id);
        postGlobalPlay(trackObject);
        postRelatedPlay(trackObject._id);
      },
      (currentTime) => {
        setTrackProgressTime(currentTime);
      },
      () => {
        skipForward(trackObject);
      },
    );
    // eslint-disable-next-line
  }, [trackObject]);

  // action when volume is changed
  useEffect(() => {
    if (isMute) handlerMute();
    WSSetVolume(volume);
    // eslint-disable-next-line
  }, [volume]);

  // action when the component is unmounted
  useEffect(() => {
    return WSDestroyInstance;
  }, []);

  function handlerPlayPause() {
    setPlayPause(WSTogglePlayPause());
  }

  function skipBackward() {
    const historySongs = JSON.parse(localStorage.getItem("trackHistory"));

    if (positionInHistory > 0) {
      dispatch(setPositionInHistory(positionInHistory - 1));
    }

    const prevSong = JSON.parse(localStorage.getItem("trackHistory"))[
      positionInHistory
    ];

    localStorage.setItem("trackHistory", JSON.stringify(historySongs));

    dispatch(trackObjectAction(prevSong));
  }

  function skipForward(trackObject) {
    const trackQueue = JSON.parse(localStorage.getItem("trackQueue"));

    if (trackQueue === null || trackQueue.length < 1) {
      playNextRandomRelated(trackObject._id).then((response) => {
        if (response.data.data) {
          const relatedTracks = response.data.data;
          const unixTime = Date.now();
          const index = unixTime % relatedTracks.length;
          const nextTrackId = relatedTracks[index]?.next_track_id;
          // console.log("playbar next random", nextTrackId);
          if (nextTrackId) {
            console.log("next Random Laravel", nextTrackId);
            getTrackById(nextTrackId).then((response) => {
              if (response.data.currentTrack) {
                const nextTrack = response.data.currentTrack;
                console.log("next Random Track", response.data.currentTrack);
                dispatch(trackObjectAction(nextTrack));
              }
            });
          }
        }
      });    
    } else {
      const nextSong = trackQueue.shift();
      localStorage.setItem("trackQueue", JSON.stringify(trackQueue));
      dispatch(trackObjectAction(nextSong));
    }
    const resetedHistoryPosition = resetPositionInHistory();
    dispatch(setPositionInHistory(resetedHistoryPosition));
  }

  function handlerMute() {
    const state = WSToggleMute();
    if (!state) WSSetVolume(volume);
    setIsMute(state);
  }

  function handlerChromeCast() {
    setIsChromecast(!isChromeCast);
  }

  return (
    <>
      <Row>
        <Col>
          <Row className="main-playbar-container">
            <Col lg={3} md={6} xs={5} className="playbar-track-info-container">
              <Row className="playbar-info">
                <Col lg={3} md={3} xs={6}>
                  <div className="playbar-image">
                    <TrackImg urlCover={trackObject.urlCover} />
                  </div>
                </Col>
                <Col lg={9} md={9} xs={6}>
                  <Row className="playbar-title">
                    <span>{trackObject.title}</span>
                  </Row>
                  <Row className="playbar-author">
                    <span>{trackObject.author}</span>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} xs={5}>
              <Row className="playbar-buttons-container">
                <Col lg={1} md={4} xs={4} className="skip-backward">
                  <div onClick={skipBackward}>
                    <SkipPreviousOutlined fontSize="large" />
                  </div>
                </Col>
                {isTrackLoaded && (
                  <>
                    <Col lg={1} className="d-none d-lg-block">
                      <div onClick={WSRewindBackward}>
                        <FastRewindOutlined fontSize="large" />
                      </div>
                    </Col>
                    <Col lg={1} md={4} xs={4}>
                      {isTrackLoaded && isPlayPause && (
                        <div onClick={handlerPlayPause}>
                          <PauseOutlined fontSize="large" />
                        </div>
                      )}
                      {isTrackLoaded && !isPlayPause && (
                        <div onClick={handlerPlayPause}>
                          <PlayArrowOutlined fontSize="large" />
                        </div>
                      )}
                    </Col>
                    <Col lg={1} md={4} xs={4}>
                      {isTrackLoaded && (
                        <div onClick={WSFastForward}>
                          <FastForwardOutlined fontSize="large" />
                        </div>
                      )}
                    </Col>
                  </>
                )}
                {!isTrackLoaded && (
                  <Col lg={2} className="d-none d-lg-block playbar-isloading">
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </Col>
                )}
                <Col lg={1} md={4} xs={4}>
                  <div onClick={skipForward}>
                    <SkipNextOutlined fontSize="large" />
                  </div>
                </Col>
              </Row>
              <Row className="playbar-wave-container d-none d-lg-block">
                <Col>
                  <div className="playbar-wave" />
                </Col>
              </Row>
            </Col>
            <Col lg={1} className="d-none d-lg-block">
              {isTrackLoaded && (
                <Row className="playbar-timer">
                  {trackProgressTime} / {trackDurationTime}
                </Row>
              )}
            </Col>
            <Col lg={2} className="d-none d-lg-block">
              {isTrackLoaded && (
                <Row className="playbar-volume-container">
                  <Col lg={2}>
                    {!isMute ? (
                      <div onClick={handlerMute}>
                        <VolumeUpOutlined fontSize="medium" />
                      </div>
                    ) : (
                      <div onClick={handlerMute}>
                        <VolumeOffOutlined fontSize="medium" />
                      </div>
                    )}
                  </Col>
                  <Col lg={6}>
                    <input
                      type="range"
                      value={volume}
                      onChange={(e) => {
                        setVolume(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              )}
            </Col>
            <Col lg={2} md={2} xs={2}>
              <Row>
                <Col md={2} className="d-none d-md-block playbar-fav-button">
                  {/* TEMPORAL BUTTONS */}
                  <Link to="/queue-tracks">
                    <div>Show queue</div>
                  </Link>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  xs={4}
                  className="d-flex align-content-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <span
                    onClick={() => {
                      dispatch(isPlayBarDisplayedAction(false));
                    }}
                  >
                    <Cancel />
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="playbar-cast-container d-none d-lg-block d-md-block">
            {!isChromeCast ? (
              <div onClick={handlerChromeCast} className="cast-block">
                <CastOutlined fontSize="medium" />
              </div>
            ) : (
              <div onClick={handlerChromeCast} className="cast-block">
                <CastConnected fontSize="medium" />
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PlayBar;
