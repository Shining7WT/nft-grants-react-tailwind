import React from "react";
import { Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import logo from "../../img/logo.svg";
import stacksCode from "../../img/Stacks-code-Metaverse.png";

import "./confirmPage.scss";

export default function ConfirmPage(props) {
  const { state } = useLocation();

  return (
    <>
      <Row className="confirm-row-1">
        <Col md={12}>
          <img src={logo} alt="logo" width={183} />
        </Col>
      </Row>
      <Row className="confirm-image-row">
        <Col md={12}>
          <div className="center-image">
            <img src={stacksCode} alt="stacksCode" width={220} height={205} />
          </div>
        </Col>
      </Row>
      <Row className="confirm-row-3">
        <Col md={12}>
          <h2>{(state) ? state.title : 'Confirmed!'}</h2>
        </Col>
      </Row>
      <Row className="confirm-row-4">
        <Col md={12}>
          <p>
            {
              (state)
              ? <>{state.message.split('<>')[0] ? state.message.split('<>')[0] : ''}<br />{state.message.split('<>')[1] ? state.message.split('<>')[1] : ''}</>
              : 'Thank you.'
            }
          </p>
        </Col>
      </Row>
    </>
  );
}
