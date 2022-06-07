import React from "react";
import styled from "styled-components";

import bunny from "../../assets/images/error/bunny.png";
import rino from "../../assets/images/error/rino.png";
import turtle from "../../assets/images/error/turtle.png";
import bigSpeechBubble from "../../assets/images/error/big-speech-bubble.png";
import smallSpeechBubble from "../../assets/images/error/small-speech-bubble.png";
import dust from "../../assets/images/error/dust.png";

const Error = () => {
  return (
    <ErrorTemplate>
      <div className="container">
        <LeftContainer>
          <img src={turtle} alt="turtle" className="bigTurtle" />
          <img src={turtle} alt="turtle" className="smallTurtle" />
        </LeftContainer>
        <CenterContainer>
          <div className="errorMessageBubble">
            <img
              src={bigSpeechBubble}
              alt="bigSpeechBubble"
              className="bigSpeechBubble"
            />
            <ErrorMessage>
              <h1>404</h1>
              <pre>
                <p>We looked every where for this page.</p>
                <p>Are you sure the website URL is correct?</p>
                <p>Get in touch with the site owner.</p>
              </pre>
              <p className="onomatopoeia">oops!</p>
            </ErrorMessage>
          </div>
          <div className="imgGroup">
            <img src={bunny} alt="bunny" className="bunny" />
            <img src={dust} alt="dust" className="dust" />
          </div>
        </CenterContainer>
        <RightContainer>
          <div className="goBackBtn">
            <img
              src={smallSpeechBubble}
              alt="smallSpeechBubble"
              className="smallSpeechBubble"
            />
            <p>Go Back</p>
          </div>
          <img src={rino} alt="rino" className="rino" />
          <img src={dust} alt="dust" className="dust" />
        </RightContainer>
      </div>
    </ErrorTemplate>
  );
};

const ErrorTemplate = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Jua&family=Julee&display=swap");

  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(10%);

  .container {
    position: relative;
    width: 1280px;
    height: 700px;
    background-color: #64659d;
  }
`;

const LeftContainer = styled.div`
  img {
    position: absolute;
    transform: rotate(90deg);
  }

  .bigTurtle {
    width: 100px;
    margin: 30px 0 0 -18px;
  }

  .smallTurtle {
    width: 70px;
    margin: 130px 0 0 -12px;
  }
`;

const CenterContainer = styled.div`
  position: relative;
  margin: 25px 30px;

  .bunny {
    width: 200px;
    margin-left: 30px;
  }

  .dust {
    margin-bottom: 20px;
  }

  .bigSpeechBubble {
    width: 800px;
    margin-left: 100px;
  }
`;

const ErrorMessage = styled.div`
  h1 {
    position: absolute;
    top: 30px;
    left: 330px;
    font-size: 150px;
    font-family: "Jua", sans-serif;
    color: white;
  }

  pre {
    position: absolute;
    top: 170px;
    left: 150px;
    width: 750px;
    font-size: 35px;
    font-family: "Julee", cursive;
    color: white;

    p {
      margin: 5px 0;
    }
  }

  .onomatopoeia {
    position: absolute;
    top: 100px;
    right: 400px;
    transform: rotate(10deg);
    font-size: 60px;
    font-family: "Jua", sans-serif;
    color: white;
  }
`;

const RightContainer = styled.div`
  position: relative;

  .goBackBtn {
    position: relative;
    text-align: center;
    cursor: pointer;

    p {
      position: absolute;
      bottom: 420px;
      right: 135px;
      width: 100px;
      font-size: 40px;
      color: white;
    }
    .smallSpeechBubble {
      position: absolute;
      bottom: 330px;
      right: 100px;
    }
  }

  .rino {
    position: absolute;
    bottom: 60px;
    right: 100px;
    width: 400px;
  }

  .dust {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;

export default Error;
