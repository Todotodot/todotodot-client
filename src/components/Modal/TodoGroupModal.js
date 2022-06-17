/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Portal from "../Portal/Portal";
import Button from "../shared/Button";
import Line from "../shared/Line";
import {
  fetchGroupInfo,
  fetchUserInfo,
  setModalInfo,
} from "../../features/todoSlice";
import * as api from "../../api";

const TodoGroupModal = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector((state) => state.modalInfo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const closeModal = () => {
    dispatch(
      setModalInfo({
        propsCategory: modalInfo.propsCategory.includes("Group")
          ? "Group"
          : "TODO",
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    switch (modalInfo.propsCategory) {
      case "CreateTODO":
        await api.createTodo({ title, content });
        break;
      case "UpdateTODO":
        await api.updateTodo(modalInfo.todoId, { title, content });
        break;
      case "CreateGroupTODO":
        await api.createGroupTodo(modalInfo.groupId, { title, content });
        break;
      case "UpdateGroupTODO":
        await api.updateGroupTodo(modalInfo.groupId, modalInfo.todoId, {
          title,
          content,
        });
        break;
      case "CreateGroup":
        await api.createGroup({ title });
        break;
      case "UpdateGroup":
        await api.updateGroup(modalInfo.groupId, { title });
        break;
      default:
    }

    if (modalInfo.groupId && modalInfo.propsCategory.includes("TODO")) {
      dispatch(fetchGroupInfo(modalInfo));
    } else {
      dispatch(fetchUserInfo());
    }

    closeModal();
  };

  return (
    <Portal>
      <Background>
        <Content>
          <form>
            <CategoryWrapper>
              <p>{modalInfo.propsCategory}</p>
              <Line />
            </CategoryWrapper>
            <TitleInput
              type="text"
              placeholder="제목을 입력하세요."
              name="title"
              value={title || modalInfo.title || ""}
              onChange={(event) => setTitle(event.target.value)}
            />
            {!(
              modalInfo.propsCategory === "CreateGroup" ||
              modalInfo.propsCategory === "UpdateGroup"
            ) && (
              <ContentTextarea
                type="text"
                placeholder="내용을 입력하세요."
                name="content"
                value={content || ""}
                onChange={(event) => setContent(event.target.value)}
              />
            )}
            <ResponseButton onClick={handleSubmit}>
              {modalInfo.propsCategory.includes("Create") ? "Create" : "Update"}
            </ResponseButton>
          </form>
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
  width: 700px;
  border: 4px solid #49251c;
  border-radius: 25px;
  background-color: white;
  text-align: center;
  overflow: scroll;

  .closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: Transparent;
    font-size: 40px;
    font-family: "TTCrownMychewR";
    cursor: pointer;
  }
`;

const CategoryWrapper = styled.div`
  float: left;
  width: 100px;
  margin: 15px 0 20px 48px;

  p {
    margin-bottom: 3px;
    color: #ec7665;
    font-size: 29px;
    font-weight: bold;
  }
`;

const TitleInput = styled.input`
  width: 590px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 5px;
  border: 4px solid #4a5280;
  border-radius: 10px;
  font-size: 22px;
`;

const ContentTextarea = styled.textarea`
  width: 590px;
  height: 240px;
  padding: 10px 5px;
  border: 4px solid #4a5280;
  border-radius: 10px;
  font-size: 25px;
  resize: none;
`;

const ResponseButton = styled(Button)`
  width: 150px;
  height: 35px;
  margin: 10px 30px 10px 30px;
`;

export default TodoGroupModal;
