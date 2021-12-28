import React from "react";
import LogoImage from "../../../img/logo.svg";
import "./login.scss";
import github from "../../../img/github-logo.svg";
import StackBackground from "../../../img/stack-back.png";
import { API_ENDPOINT_URL } from '../../../constants/default'

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="top-content">
        <img src={LogoImage} className="logo" />
        <h2>New Grant Form</h2>
        <p>Please link your github account to continue</p>
        <a className="login-button" href={`${API_ENDPOINT_URL}/auth/github`}>
          Login with Github
          <img src={github} alt="Login With Github" />
        </a>
      </div>

      <div className="bottom-gradient" style={{ backgroundImage: `url(${StackBackground})` }}>
        <span className="lets-build">Let's build</span>
      </div>
    </div>
  );
};

export default Login;
