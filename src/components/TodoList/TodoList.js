import React from "react";
import styled from "styled-components";

import Line from "../shared/Line";
import Button from "../shared/Button";
import ListItemContainer from "../shared/ListItemContainer";
import MaincContainer from "../shared/MainContainer";

import pencil from "../../assets/images/icons/pencil.png";
import trashCan from "../../assets/images/icons/trash-can.png";

const TodoList = () => {
  return (
    <MaincContainer>
      <TodoListHeader>
        <div className="listTitle">
          <p className="title">Todo</p>
          <Line />
        </div>
        <TodoListDropDown>
          <option value="inCompleted">inCompleted</option>
          <option value="Completed">Completed</option>
          <option value="All">All</option>
        </TodoListDropDown>
      </TodoListHeader>
      <ul className="listBody">
        <ListItemContainer>
          <label>
            <input type="checkbox" className="todoCompleteBtn" name="completed" />
            <span className="checkbox"></span>
          </label>
          <p className="title">todo title</p>
          <div className="btnGroup">
            <button className="updateBtn">
              <img src={pencil} alt="pencil" />
            </button>
            <button className="deleteBtn">
              <img src={trashCan} alt="trashCan" />
            </button>
          </div>
        </ListItemContainer>
      </ul>
      <TodoCreateBtn>Create</TodoCreateBtn>
    </MaincContainer>
  );
};

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
  background-color: #ECA2A2;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const TodoCreateBtn = styled(Button)`
  float: right;
  width: 120px;
  height: 35px;
  margin: 0 20px;
  padding: 2px 0;
`;

export default TodoList;
