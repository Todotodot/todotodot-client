import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import { setModalInfo } from "../../features/todoSlice";
import * as api from "../../api/index";

const GameResultModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalInfo = useSelector((state) => state.modalInfo);

  const closeModal = () => {
    dispatch(
      setModalInfo({
        propsCategory: modalInfo.propsCategory.includes("Group")
          ? "Group"
          : "TODO",
      })
    );

    if (modalInfo.propsCategory.includes("Group")) {
      navigate(`/group/${modalInfo.groupId}`);
    } else {
      navigate("/");
    }
  };

  const handleGameEnd = async () => {
    switch (modalInfo.propsCategory) {
      case "CompleteTODO":
        await api.completeTodo(modalInfo.todoId, modalInfo.userData);
        break;
      case "CompleteGroupTODO":
        await api.completeGroupTodo(
          modalInfo.groupId,
          modalInfo.todoId,
          modalInfo.userData
        );
        break;
    }
  };

  handleGameEnd();

  return (
    <Portal>
      <Background>
        <Content>
          <TitleParagraph>{modalInfo.title}</TitleParagraph>
          <MessageParagraph>{modalInfo.message}</MessageParagraph>
          <CloseButton onClick={closeModal}>&#215;</CloseButton>
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

export default GameResultModal;
