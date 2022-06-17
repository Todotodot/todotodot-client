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

import orangeSlime from "../../assets/images/characters/orangeSlime_attack.png";
import boss from "../../assets/images/characters/hugeMushroom_attack2.png";
import exampleTodo from "../../assets/images/todo.png";
import logo from "../../assets/images/logo.png";

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
      <div className="slidePart">
        <div className="slideAnimation">
          <p>Clicker와 TodoList가 만났다!!</p>
          <img src={exampleTodo} alt="exampleTodo" />
          <div className="sprites">
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
      </div>
      <div className="loginContainer">
        <div className="loginBorder">
          <img src={logo} alt="logo" />
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
  height: 100vh;

  .slidePart {
    width: 70%;
    transform: translateY(20%);

    .slideAnimation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      animation: ${LeftSectionAnimation} 1s linear;

      p {
        font-size: 50px;
        font-family: "TTCrownMychewR";
      }

      img {
        width: 700px;
      }

      .sprites {
        position: relative;
        width: 700px;
      }
    }
  }

  .loginContainer {
    position: relative;
    width: 30%;
    height: auto;
    background-color: rgba(169, 170, 188, 0.5);
    animation: ${RightSectionAnimation} 0.5s linear;

    .loginBorder {
      transform: translateY(90%);

      img {
        width: 250px;
      }
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
  position: absolute;
  right: -60px;
  bottom: 0;
  width: 300px;
`;

export default Login;
