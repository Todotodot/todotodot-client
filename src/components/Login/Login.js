import React from "react";
import styled, { keyframes } from "styled-components";
import Sprite from "react-responsive-spritesheet";

import {
  firebaseAuth,
  googleProvider,
  googlePopup,
} from "../../config/firebase";
import { login } from "../../api/index";
import Button from "../shared/Button";
import catchAsync from "../../utils/catchAsync";

import orangeSlime from "../../assets/images/characters/orangeSlime_attack.png";
import boss from "../../assets/images/characters/hugeMushroom_attack2.png";
import exampleTodo from "../../assets/images/todo.png";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const onLogin = catchAsync(async () => {
    const data = await googlePopup(firebaseAuth, googleProvider);
    const token = await data.user.getIdToken();

    if (data && token) {
      await login(token);
    }
  });

  return (
    <LoginStyle>
      <div className="slidePart">
        <div className="slideAnimation">
          <p>Clicker와 TodoList가 만났다!!</p>
          <img src={exampleTodo} alt="exampleTodo" />
          <Boss
            image={boss}
            widthFrame={1050}
            heightFrame={975}
            steps={8}
            fps={8}
            autoplay={true}
            loop={true}
          />
          <OrangeSlime
            image={orangeSlime}
            widthFrame={270}
            heightFrame={212}
            steps={3}
            fps={8}
            autoplay={true}
            loop={true}
          />
        </div>
      </div>
      <div className="loginPart">
        <img src={logo} alt="logo" />
        <div className="loginBtn">
          <Button onClick={onLogin}>Sign in with Google account</Button>
        </div>
      </div>
    </LoginStyle>
  );
};

const LeftSectionAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

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
  display: flex;
  text-align: center;

  .slidePart {
    width: 70%;
    height: 100vh;
    background-color: #7877c1;

    .slideAnimation {
      position: relative;
      top: 20%;
      animation: ${LeftSectionAnimation} 1s linear;

      p {
        font-size: 50px;
        font-family: "TTCrownMychewR";
      }

      img {
        width: 700px;
      }
    }
  }

  .loginPart {
    position: relative;
    width: 30%;
    height: 100vh;
    padding-top: 10%;
    background-color: #eca2a2;
    animation: ${RightSectionAnimation} 0.5s linear;

    img {
      width: 250px;
    }
  }
`;

const OrangeSlime = styled(Sprite)`
  position: absolute;
  top: 3px;
  left: 400px;
  width: 70px;
`;

const Boss = styled(Sprite)`
  position: absolute;
  right: 300px;
  bottom: 0;
  width: 300px;
`;

export default Login;
