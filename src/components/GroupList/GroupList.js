import React from "react";
import styled from "styled-components";

import Line from "../shared/Line";
import Button from "../shared/Button";
import ListItemContainer from "../shared/ListItemContainer";
import MaincContainer from "../shared/MainContainer";

import pencil from "../../assets/images/icons/pencil.png";
import exit from "../../assets/images/icons/exit.png";

function GroupList() {
  return (
    <MaincContainer>
      <GroupListHeader>
        <div className="listTitle">
          <p className="title">Room</p>
          <Line />
        </div>
      </GroupListHeader>
      <ul className="listBody">
        <ListItemContainer>
          <p className="title">room title</p>
          <div className="btnGroup">
            <button className="updateBtn">
              <img src={pencil} alt="pencil" />
            </button>
            <button className="deleteBtn">
              <img src={exit} alt="exit" />
            </button>
          </div>
        </ListItemContainer>
      </ul>
      <GroupCreateBtn>Create</GroupCreateBtn>
    </MaincContainer>
  );
}

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
