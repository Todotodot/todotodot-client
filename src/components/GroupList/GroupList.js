import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import Line from "../shared/Line";
import Button from "../shared/Button";
import ListItemContainer from "../shared/ListItemContainer";
import MainContainer from "../shared/MainContainer";
import { setModalInfo } from "../../features/todoSlice";

import pencil from "../../assets/images/icons/pencil.png";
import exit from "../../assets/images/icons/exit.png";

const GroupList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const handleCreateModalOpen = () => {
    dispatch(
      setModalInfo({
        propsCategory: "CreateGroup",
        todoModal: true,
      })
    );
  };

  const handleUpdateModalOpen = (id, updateTitle) => {
    dispatch(
      setModalInfo({
        propsCategory: "UpdateGroup",
        title: updateTitle,
        groupId: id,
        todoModal: true,
      })
    );
  };

  const handleDeleteModalOpen = (id) => {
    dispatch(
      setModalInfo({
        confirmMessage: "방을 나가시겠습니까?",
        propsCategory: "DeleteGroup",
        groupId: id,
        confirmModal: true,
      })
    );
  };

  const showGroupTodo = (id) => {
    navigate(`/group/${id}`);
  };

  return (
    <GroupListMainContainer>
      <div className="mainBody">
        <GroupListHeader>
          <div className="listTitle">
            <p className="title">Room</p>
            <Line />
          </div>
        </GroupListHeader>
        <ul className="listBody">
          {user.groups
            && user.groups.map((item) => (
              <ListItemContainer key={item._id}>
                <button
                  className="titleBtn"
                  onClick={() => showGroupTodo(item._id)}
                >
                  <p className="title">{item.title}</p>
                </button>
                <div className="buttonContainer">
                  <button
                    className="updateBtn"
                    onClick={() => handleUpdateModalOpen(item._id, item.title)}
                  >
                    <img src={pencil} alt="updateBtn" />
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteModalOpen(item._id)}
                  >
                    <img src={exit} alt="deleteBtn" />
                  </button>
                </div>
              </ListItemContainer>
            ))}
        </ul>
        <GroupCreateBtn onClick={handleCreateModalOpen}>
          Create
        </GroupCreateBtn>
      </div>
    </GroupListMainContainer>
  );
};

const GroupListAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const GroupListMainContainer = styled(MainContainer)`
  animation: ${GroupListAnimation} 0.5s linear;
`;

const GroupListHeader = styled.div`
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

const GroupCreateBtn = styled(Button)`
  float: right;
  width: 120px;
  height: 35px;
  margin: 0 20px;
  padding: 2px 0;
`;

export default GroupList;
