import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";

//Components
import { Row, Col } from "react-bootstrap";

//Icons
import { HomeOutlined, CloudUpload, SearchOutlined } from "@material-ui/icons";

import ProfileCircleIcon from "../ProfileCircleIcon";

import { setUploadTrackModal } from "../../redux/modalsHandler/actions";

export default function BottomMenu() {
  const dispatch = useDispatch();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { profileImg } = useSelector((state) => state.userReducer.data);

  function handleChange() {
    isUploadModalOpen
      ? dispatch(setUploadTrackModal(false))
      : dispatch(setUploadTrackModal(true));
    setIsUploadModalOpen(!isUploadModalOpen);
  }
  return (
    <aside className="mobile-bottom-menu">
      <Row>
        <Col className="mobile-bottom-menu-button">
          <Link to="/">
            <HomeOutlined fontSize="large" />
          </Link>
        </Col>
        <Col className="mobile-bottom-menu-button">
          <SearchOutlined fontSize="large" />
        </Col>
        <Col
          className="mobile-bottom-menu-button"
          onClick={() => {
            handleChange();
          }}
        >
          <CloudUpload fontSize="large" />
        </Col>
        <Col className="mobile-bottom-menu-button">
          <Link to="/profile" className="mobile-bottom-menu-row">
            <ProfileCircleIcon profileImg={profileImg} />
          </Link>
        </Col>
      </Row>
    </aside>
  );
}
