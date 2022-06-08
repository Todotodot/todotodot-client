import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "../Portal/Portal";
import Button from "../shared/Button";

const ConfirmationModal = ({ setModalOn }) => {
  const handleSubmit = (clicked) => {
    if (clicked === "NO") {
      setModalOn(false);
    }

    // api 요청 로직
  };

  return (
    <Portal>
      <Background>
        <Content>
          <MessageParagraph>props message</MessageParagraph>
          <div>
            <ResponseButton onClick={() => handleSubmit("YES")}>
              YES
            </ResponseButton>
            <ResponseButton onClick={() => handleSubmit("NO")}>
              NO
            </ResponseButton>
          </div>
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
  width: 450px;
  height: 250px;
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
  top: 5px;
  right: 7px;
  background-color: Transparent;
  border: none;
  font-size: 40px;
`;

const MessageParagraph = styled.p`
  width: 370px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #4a5280;
  border-radius: 15px;
  margin-top: 30px;
  font-size: 25px;
`;

const ResponseButton = styled(Button)`
  width: 70px;
  height: 35px;
  margin: 20px 30px 0px 30px;
`;

ConfirmationModal.propTypes = {
  setModalOn: PropTypes.func.isRequired,
};

export default ConfirmationModal;
