import React from "react";
import { Row, Col } from "reactstrap";
import logo from "../../img/logo.svg";
import "./ErrorPage.scss";

export default function UnAuthorizedPage() {
  return (
    <>
      <Row className="unauthorized-row-1">
        <Col md={12}>
          <img src={logo} alt="logo" width={183} />
        </Col>
      </Row>
      <Row className="unauthorized-row-2">
        <Col md={12}>
          <h2> Sorry, something is not right</h2>
        </Col>
      </Row>
      <Row className="unauthorized-row-3">
        <Col md={12}>
          <p>
            Please click on the link provided in the Github issue
          </p>
        </Col>
      </Row>
    </>
  );
}
