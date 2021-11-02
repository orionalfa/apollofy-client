import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.css";

//import TrackReducer
import {
  isPlayBarDisplayedAction,
  trackObjectAction,
} from "../../redux/trackData/actions";

//Hoc Authorization
import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";
import { getTrackById } from "../../services/api/index";

function TrackView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [trackData, setTrackData] = useState({});

  useEffect(() => {
    getTrackById(id).then((response) => {
      setTrackData(response.data.currentTrack);
    });
  }, []);

  function setReduxTrackData() {
    dispatch(trackObjectAction(trackData));
    dispatch(isPlayBarDisplayedAction(true));
  }

  return (
    <div className="page">
      <Container className="track-view">
        <Row>
          <Col xs={12} md={12} lg={6}>
            <img
              className="track-image-container"
              src={trackData.urlCover}
              alt="cover"
            />
          </Col>

          <Col xs={12} md={12} lg={6}>
            <div className="track-info-container">
              <h4 className="track-Author">Author: {trackData.author}</h4>
              <h4 className="track-Title">Title: {trackData.title}</h4>
              <h4 className="track-duration">
                Uploaded at: {trackData.createdAt}
              </h4>
              <h4 className="track-album">Album: {trackData.album}</h4>
              <h4 className="track-year">
                Relese Year: {trackData.releaseYear}
              </h4>
              <h4 className="track-genre">Genre: {trackData.genre}</h4>

              <button
                className="form-control btn btn-primary mt-5 mb-5"
                onClick={setReduxTrackData}
              >
                Go to PlayBar
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withAuth(BarsAndModal(TrackView));
