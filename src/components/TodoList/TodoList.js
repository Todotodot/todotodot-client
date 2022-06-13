import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import Line from "../shared/Line";
import Button from "../shared/Button";
import ListItemContainer from "../shared/ListItemContainer";
import MainContainer from "../shared/MainContainer";
import { setModalInfo } from "../../features/todoSlice";

import pencil from "../../assets/images/icons/pencil.png";
import trashCan from "../../assets/images/icons/trash-can.png";

const TodoList = ({ onFilterValue }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [selectItem, setSelectItem] = useState("inCompleted");
  const selectList = ["inCompleted", "Completed", "All"];

  const handleCreateModalOpen = () => {
    dispatch(
      setModalInfo({
        propsCategory: id ? "CreateGroupTODO" : "CreateTODO",
        groupId: id,
        todoModal: true,
      })
    );
  };

  const handleUpdateModalOpen = (updateTodoId, updateTitle, updateContent) => {
    dispatch(
      setModalInfo({
        propsCategory: id ? "UpdateGroupTODO" : "UpdateTODO",
        title: updateTitle,
        content: updateContent,
        groupId: id,
        todoId: updateTodoId,
        todoModal: true,
      })
    );
  };

  const handleDeleteModalOpen = (deleteTodoId) => {
    dispatch(
      setModalInfo({
        confirmMessage: "정말로 삭제하시겠습니까?",
        propsCategory: id ? "DeleteGroupTODO" : "DeleteTODO",
        groupId: id,
        todoId: deleteTodoId,
        confirmModal: true,
      })
    );
  };

  const handleGameModalOpen = () => {
    dispatch(
      setModalInfo({
        confirmMessage: "게임을 시작하시겠습니까?",
        propsCategory: id ? "Group" : "TODO",
        confirmModal: true,
      })
    );
  };

  const handleSelectItem = (event) => {
    const { value } = event.target;

    setSelectItem(value);
    onFilterValue(value);
  };

  return (
    <TodoListMainContainer>
      <div className="mainBody">
        <TodoListHeader>
          <div>
            <p className="title">Todo</p>
            <Line />
          </div>
          <TodoListDropDown
            value={selectItem}
            onChange={handleSelectItem}
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </TodoListDropDown>
        </TodoListHeader>
        <ul className="listBody">
          {user.todos && user.todos.map((item) => (
              <ListItemContainer key={item._id}>
                <label>
                  <input
                    type="checkbox"
                    className="todoCompleteBtn"
                    name="completed"
                    onClick={() => handleGameModalOpen()}
                  />
                  <span className="checkbox" />
                </label>
                <button
                  className="titleBtn"
                  onClick={() => handleUpdateModalOpen(item._id, item.title, item.content)}
                >
                  <p className="title">{item.title}</p>
                </button>
                <div className="buttonContainer">
                  <button
                    className="updateBtn"
                    onClick={() => handleUpdateModalOpen(item._id, item.title, item.content)}
                  >
                    <img src={pencil} alt="updateBtn" />
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteModalOpen(item._id)}
                  >
                    <img src={trashCan} alt="deleteBtn" />
                  </button>
                </div>
              </ListItemContainer>
            ))}
        </ul>
        <TodoCreateBtn onClick={() => handleCreateModalOpen()}>
          Create
        </TodoCreateBtn>
      </div>
    </TodoListMainContainer>
  );
};

const TodoListAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const TodoListMainContainer = styled(MainContainer)`
  animation: ${TodoListAnimation} 0.5s linear;
`;

const TodoListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .title {
    margin-left: 5px;
    font-size: 26px;
    font-weight: bold;
    color: #ec7665;
  }
`;

const TodoListDropDown = styled.select`
  width: 160px;
  padding: 3px 5px;
  border: 2px solid #49251c;
  outline: none;
  border-radius: 5px;
  background-color: #eca2a2;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const TodoCreateBtn = styled(Button)`
  float: right;
  width: 120px;
  height: 35px;
  margin: 10px 20px;
  padding: 2px 0;
`;

TodoList.propTypes = {
  onFilterValue: PropTypes.func.isRequired,
};

export default TodoList;
