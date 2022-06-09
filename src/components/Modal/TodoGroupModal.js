import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "../Portal/Portal";
import Button from "../shared/Button";
import catchAsync from "../../utils/catchAsync";
import * as api from "../../api";

const TodoGroupModal = ({ setModalOn }) => {
  const propsCategory = "";
  const groupId = "";
  const todoId = "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = catchAsync(async () => {
    switch (propsCategory) {
      case "Create TODO":
        await api.createTodo({ title, content });
        break;
      case "Create Group TODO":
        await api.createGroupTodo(groupId, { title, content });
        break;
      case "Update TODO":
        await api.updateTodo(todoId, { title, content });
        break;
      case "Update Group TODO":
        await api.updateGroupTodo(groupId, todoId, { title, content });
        break;
      case "Create Group":
        await api.createGroup({ title });
        break;
      case "Update Group":
        await api.updateGroup(groupId, { title });
        break;
      default:
    }

    setModalOn(false);
  });

  return (
    <Portal>
      <Background>
        <Content>
          <form>
            <CategoryWrapper>
              <CategoryParagraph>{propsCategory}</CategoryParagraph>
            </CategoryWrapper>
            <TitleInput
              type="text"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {groupId && (
              <ContentTextarea
                type="text"
                placeholder="내용을 입력하세요."
                value={content}
                onChange={(ev) => setContent(ev.target.value)}
              />
            )}
            <ResponseButton onClick={handleSubmit}>
              {propsCategory.includes("Create") ? "Create" : "Update"}
            </ResponseButton>
          </form>
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
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: scroll;
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

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  margin-left: 48px;
`;

const CategoryParagraph = styled.p`
  color: #ec7665;
  border-bottom: 3px solid #49251c;
  font-size: 40px;
`;

const TitleInput = styled.input`
  width: 600px;
  height: 40px;
  border: 4px solid #4a5280;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 22px;
`;

const ContentTextarea = styled.textarea`
  width: 600px;
  height: 260px;
  border: 4px solid #4a5280;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 25px;
  resize: none;
`;

const ResponseButton = styled(Button)`
  width: 150px;
  height: 35px;
  margin: 10px 30px 10px 30px;
`;

TodoGroupModal.propTypes = {
  setModalOn: PropTypes.func.isRequired,
};

export default TodoGroupModal;
