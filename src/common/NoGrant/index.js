import React from "react";
import { Row, Col } from "reactstrap";
import logo from "../../img/logo.svg";
import "./noGrants.scss";

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
          <h2>No Pending Grants</h2>
        </Col>
      </Row>
      <Row className="unauthorized-row-3">
        <Col md={12}>
          <p>
            We’re sorry, no onboarding is ready for you.
            <br /> Please comment on the Github issue <br /> if experiencing
            issues.
          </p>
        </Col>
      </Row>
    </>
  );
}
