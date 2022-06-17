/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import Line from "../shared/Line";
import Button from "../shared/Button";
import ListItemContainer from "../shared/ListItemContainer";
import MainContainer from "../shared/MainContainer";
import { firebaseAuth } from "../../config/firebase";
import { authorization, setModalInfo } from "../../features/todoSlice";

import pencil from "../../assets/images/icons/pencil.png";
import trashCan from "../../assets/images/icons/trash-can.png";

const TodoList = ({ onFilterValue }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const group = useSelector((state) => state.groupInfo);

  const [todoList, setTodoList] = useState(null);
  const [selectItem, setSelectItem] = useState("inCompleted");
  const selectList = ["inCompleted", "Completed", "All"];

  const handleLogout = async () => {
    await firebaseAuth.signOut();

    localStorage.removeItem("profile");

    if (!localStorage.getItem("profile")) {
      dispatch(authorization());
      navigate("/login");
    }
  };

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

  const handleGameModalOpen = (todoId) => {
    dispatch(
      setModalInfo({
        confirmMessage: "게임을 시작하시겠습니까?",
        propsCategory: id ? "Group" : "TODO",
        confirmModal: true,
        user,
        groupId: id,
        todoId,
      })
    );
  };

  const handleSelectItem = (event) => {
    const { value } = event.target;

    setSelectItem(value);
    onFilterValue(value);
  };

  useEffect(() => {
    if (id && group.todos) {
      setTodoList(group.todos);
    } else {
      setTodoList(user.todos);
    }
  });

  return (
    <TodoListMainContainer>
      <div className="logoutBtn">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="mainBody">
        <TodoListHeader>
          <div>
            <p className="title">Todo</p>
            <Line />
          </div>
          <TodoListDropDown value={selectItem} onChange={handleSelectItem}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </TodoListDropDown>
        </TodoListHeader>
        <ul className="listBody">
          {todoList &&
            todoList.map((item) => (
              <ListItemContainer key={item._id}>
                <label>
                  <input
                    type="checkbox"
                    className="todoCompleteBtn"
                    name="completed"
                    checked={item.isCompleted}
                    onChange={() => handleGameModalOpen(item._id)}
                  />
                  <span className="checkbox" />
                </label>
                <button
                  className="titleBtn"
                  onClick={() =>
                    handleUpdateModalOpen(item._id, item.title, item.content)
                  }
                >
                  <p className="title">{item.title}</p>
                </button>
                <div className="buttonContainer">
                  <button
                    className="updateBtn"
                    onClick={() =>
                      handleUpdateModalOpen(item._id, item.title, item.content)
                    }
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
        <TodoCreateBtn onClick={handleCreateModalOpen}>Create</TodoCreateBtn>
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

  .logoutBtn {
    width: 90%;

    button {
      float: right;
      width: 120px;
      height: 35px;
      margin: 50px 0;
    }
  }
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
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 120px;
  height: 35px;
  margin: 0;
  padding: 2px 0;
`;

TodoList.propTypes = {
  onFilterValue: PropTypes.func.isRequired,
};

export default TodoList;
