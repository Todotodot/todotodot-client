/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

import backButton from "../../assets/images/back-button.png";

const UserList = () => {
  const [members, setMembers] = useState([]); // 한명이라도 있어야 group이 형성될 수 있으니 length로 확인 가능합니다
  const [todos, setTodos] = useState([]); // todo는 아직 없을수도 있으니 length로 유효성을 확인하면 안됩니다
  const [group, setGroup] = useState({});

  const axios = async () => {
    const result = await Axios.get(
      "http://localhost:5000/groups/629f52886e2d583d981b65f0",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("profile")}` },
      }
    );

    setGroup(result.data.data.group);
    setTodos(result.data.data.group.todos);
    setMembers(result.data.data.group.members);
  };

  useEffect(() => {
    axios();
  }, []);

  return (
    <UserListStyle>
      <ListNavBar>
        <img className="backButton" src={backButton} alt="back" />
        <div className="emoji">🐮</div>
        <div className="infoText">User List</div>
      </ListNavBar>
      <ListContainer>
        <div className="userText">
          <div className="text">User</div>
        </div>
        <div className="listWrapper">
          <ul>
            {members.length &&
              members.map((member) => (
                <div className="member">
                  <div className="emoji">🔥</div>
                  <li key={member._id} className="memberName">
                    {member.name}
                  </li>
                </div>
              ))}
          </ul>
        </div>
      </ListContainer>
    </UserListStyle>
  );
};

const UserListStyle = styled.div`
  border: 1px solid black;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListNavBar = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .backButton {
    width: 10%;
  }

  .emoji {
    width: 20%;
    font-size: 50px;
    margin-left: 20px;
  }

  .infoText {
    width: 70%;
    font-size: 26px;
    float: right;
    margin-right: 5px;
    text-align: right;
  }
`;

const ListContainer = styled.div`
  border: 2px solid #49251c;
  border-radius: 8px;
  width: 90%;
  height: 85%;
  display: flex;
  flex-direction: column;

  .userText {
    border-bottom: 2px solid #49251c;
    margin-left: 7%;
    width: 70%;
    height: 50px;
    display: flex;
    align-items: center;

    .text {
      font-size: 35px;
      color: #ec7665;
    }
  }

  .listWrapper {
    width: 300px;
    margin-left: 5%;

    .member {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      margin-top: 5px;

      .emoji {
        width: 20%;
        font-size: 50px;
      }

      .memberName {
        margin-left: 7px;
      }
    }
  }
`;

export default UserList;
