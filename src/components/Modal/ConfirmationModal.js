import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import Button from "../shared/Button";
import catchAsync from "../../utils/catchAsync";
import {
  fetchGroupInfo,
  fetchUserInfo,
  setModalInfo,
} from "../../features/todoSlice";
import * as api from "../../api";

const ConfirmationModal = () => {
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
  };

  const handleSubmit = catchAsync(async (event) => {
    event.preventDefault();

    switch (modalInfo.propsCategory) {
      case "DeleteTODO":
        await api.deleteTodo(modalInfo.todoId);
        break;
      case "DeleteGroupTODO":
        await api.deleteGroupTodo(modalInfo.groupId, modalInfo.todoId);
        break;
      case "DeleteGroup":
        await api.deleteGroup(modalInfo.groupId);
        break;
      case "Group":
        navigate(`/inGame/${modalInfo.groupId}/todos/${modalInfo.todoId}`);
        break;
      case "TODO":
        navigate(`inGame/todos/${modalInfo.todoId}`);
        break;
      default:
    }

    if (modalInfo.groupId && modalInfo.propsCategory.includes("TODO")) {
      dispatch(fetchGroupInfo(modalInfo));
    } else {
      dispatch(fetchUserInfo());
    }

    closeModal();
  });

  return (
    <Portal>
      <Background>
        <Content>
          <MessageParagraph>{modalInfo.confirmMessage}</MessageParagraph>
          <div>
            <ResponseButton onClick={handleSubmit}>YES</ResponseButton>
            <ResponseButton onClick={closeModal}>NO</ResponseButton>
          </div>
          <button className="closeBtn" onClick={closeModal}>
            &#215;
          </button>
        </Content>
      </Background>
    </Portal>
  );
};

const Background = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(74, 74, 74, 0.5);
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 450px;
  height: 250px;
  border: 4px solid #49251c;
  border-radius: 25px;
  background-color: white;
  text-align: center;

  .closeBtn {
    position: absolute;
    top: 5px;
    right: 7px;
    border: none;
    background-color: Transparent;
    font-size: 40px;
    font-family: "TTCrownMychewR";
    cursor: pointer;
  }
`;

const MessageParagraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 370px;
  height: 110px;
  margin-top: 30px;
  border: 4px solid #4a5280;
  border-radius: 15px;
  font-size: 20px;
  font-weight: bold;
`;

const ResponseButton = styled(Button)`
  width: 70px;
  height: 35px;
  margin: 20px 30px 0px 30px;
`;

export default ConfirmationModal;
