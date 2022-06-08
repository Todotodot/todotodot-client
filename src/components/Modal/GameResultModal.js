import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";

const GameResultModal = ({ setModalOn }) => {
  return (
    <Portal>
      <Background>
        <Content>
          <TitleParagraph>props title</TitleParagraph>
          <MessageParagraph>props message</MessageParagraph>
          <CloseButton onClick={() => setModalOn(false)}>&#215;</CloseButton>
        </Content>
      </Background>
    </Portal>
  );
};

const Background = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0px;
`;

const Content = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-color: white;
  border: 4px solid #49251c;
  border-radius: 25px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 15px;
  background-color: Transparent;
  border: none;
  font-size: 40px;
`;

const TitleParagraph = styled.p`
  color: #ec7665;
  border-bottom: 3px solid #49251c;
  font-size: 40px;
`;

const MessageParagraph = styled.p`
  width: 530px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #4a5280;
  border-radius: 15px;
  margin-top: 30px;
  font-size: 25px;
`;

GameResultModal.propTypes = {
  setModalOn: PropTypes.func.isRequired,
};

export default GameResultModal;
