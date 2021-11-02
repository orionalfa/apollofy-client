import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

function LinkCards(props) {
  return (
    <>
      <Link to={props.to}>
        <Row className="liked-songs">
          <Col xs={4} md={4} lg={4} className="liked-icon-col">
            <FontAwesomeIcon icon={props.icon} className="liked-icon fa-3x" />
          </Col>
          <Col xs={8} md={8} lg={8} className="liked-info-col">
            <Row className="liked-go-info">{props.name}</Row>
          </Col>
        </Row>
      </Link>
    </>
  );
}

export default LinkCards;
