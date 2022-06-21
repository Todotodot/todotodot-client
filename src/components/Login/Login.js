import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Sprite from "react-responsive-spritesheet";

import Button from "../shared/Button";
import {
  firebaseAuth,
  googleProvider,
  googlePopup,
} from "../../config/firebase";
import { login } from "../../api/index";
import { fetchUserInfo } from "../../features/todoSlice";

import boss from "../../assets/images/characters/hugeMushroom_attack2.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const data = await googlePopup(firebaseAuth, googleProvider);
    const token = await data.user.getIdToken();

    if (data && token) {
      const res = await login(token);

      if (res.data.token) {
        localStorage.setItem("profile", res.data.token);
        dispatch(fetchUserInfo());
        navigate("/");
      }
    }
  };

  return (
    <LoginStyle>
      <div className="loginContainer">
        <div className="loginBorder">
          <div className="sprite">
            <Boss
              image={boss}
              widthFrame={1050}
              heightFrame={975}
              steps={8}
              fps={8}
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="loginBtn">
            <Button onClick={() => handleLogin()}>
              Sign in with Google account
            </Button>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

const RightSectionAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(-100%);
  }
`;

const LoginStyle = styled.div`
  float: right;
  height: 100vh;

  .loginContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(169, 170, 188, 0.5);
    animation: ${RightSectionAnimation} 0.5s linear;

    .loginBorder {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        width: 250px;
      }
    }

    button {
      margin-top: 0;
    }
  }
`;

const OrangeSlime = styled(Sprite)`
  position: absolute;
  top: -612px;
  left: 0;
  width: 70px;
`;

const Boss = styled(Sprite)`
  width: 300px;
`;

export default Login;
