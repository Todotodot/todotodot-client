import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import Button from "../shared/Button";
import Line from "../shared/Line";

import backButton from "../../assets/images/icons/back-button.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import settingIcon from "../../assets/images/icons/setting.png";
import soundOn from "../../assets/images/icons/sound-on.png";
import soundOff from "../../assets/images/icons/sound-off.png";
import shareIcon from "../../assets/images/icons/share.png";

const UserList = ({ onSearchValue }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = useSelector((state) => state.groupInfo);
  const [showSetting, setShowSetting] = useState(false);

  const backToMain = () => {
    navigate("/");
  };

  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:3000${location.pathname}`
    );

    alert(`Copy Success!!\n[ http://localhost:3000${location.pathname} ]`);
  };

  const handleShowSetting = () => {
    setShowSetting((open) => !open);
  };

  const handleSearchTodo = (event) => {
    const { value } = event.target;

    onSearchValue(value);
  };

  const debounceSearch = useCallback(debounce(handleSearchTodo, 200), []);

  return (
    <UserListStyle>
      <ListNavBar>
        <button className="backButton" onClick={backToMain}>
          <img src={backButton} alt="backButton" />
        </button>
        <p className="emoji">🐮</p>
        <p className="infoText">{group.title}</p>
      </ListNavBar>
      <ListContainer>
        <div className="userText">
          <div>
            <span className="text">Member</span>
            <button className="shareBtn" onClick={handleCopyClipBoard}>
              <img src={shareIcon} alt="shareBtn" />
            </button>
          </div>
          <Line />
        </div>
        <div className="listWrapper">
          <ul className="userList">
            {group.members &&
              group.members.map((member) => (
                <li key={member._id} className="member">
                  <p className="emoji">🔥</p>
                  <p className="memberName">{member.name}</p>
                </li>
              ))}
          </ul>
        </div>
      </ListContainer>
      <SearchBarContainer>
        <img className="icon" src={searchIcon} alt="icon" />
        <input type="text" className="searchBar" onChange={debounceSearch} />
      </SearchBarContainer>
      <button className="settingBtn" onClick={handleShowSetting}>
        <img src={settingIcon} alt="settingBtn" />
      </button>
      <SettingContainer isShow={showSetting ? "block" : "none"}>
        <Button>
          <img src={soundOn} alt="BGMBtn" className="soundIcon" />
          <span>배경음</span>
        </Button>
        <Button>
          <img src={soundOn} alt="SFXBtn" className="soundIcon" />
          <span>효과음</span>
        </Button>
      </SettingContainer>
    </UserListStyle>
  );
};

const UserListAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const SettingBtnAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const UserListStyle = styled.div`
  position: relative;
  height: 100vh;
  background-color: rgba(169, 170, 188, 0.5);
  animation: ${UserListAnimation} 0.6s linear;

  .settingBtn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    outline: none;
    border: none;
    background-color: transparent;

    &:hover {
      animation: ${SettingBtnAnimation} 0.6s linear;
    }

    img {
      width: 40px;
      filter: opacity(90%);
    }
  }
`;

const ListNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 10px;

  .backButton {
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    img {
      width: 70%;
      margin: 0 10px;
    }
  }

  .emoji {
    margin-left: 20px;
    font-size: 30px;
  }

  .infoText {
    float: right;
    width: 70%;
    margin: 0 10px;
    font-size: 20px;
    text-align: right;
    overflow: hidden;
  }
`;

const ListContainer = styled.div`
  width: 90%;
  height: 68%;
  margin-left: 14px;
  border: 2px solid #49251c;
  border-radius: 8px;

  .userText {
    width: 29%;
    height: 50px;
    margin: 5px 0 0 7%;

    div {
      display: flex;

      .text {
        padding: 0 130% 0 2px;
        font-size: 35px;
        color: rgba(255, 255, 255, 0.9);
      }

      .shareBtn {
        margin: 0;
        padding: 3px 0;
        outline: none;
        border: none;
        border-radius: 50%;
        background-color: transparent;
        cursor: pointer;

        img {
          width: 22px;
          filter: opacity(0.7);
        }
      }
    }
  }

  .listWrapper {
    width: 250px;
    margin-left: 5%;

    .member {
      display: flex;
      align-items: center;
      height: 50px;

      .emoji {
        font-size: 30px;
      }

      .memberName {
        font-size: 25px;
        margin-left: 10px;
      }
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 13%;

  .icon {
    position: absolute;
    left: 32px;
    width: 18px;
  }

  .searchBar {
    width: 75%;
    height: 20px;
    padding-left: 40px;
    outline: none;
    border: 3px solid #49251c;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const SettingContainer = styled.div`
  display: ${(props) => `${props.isShow}`};
  position: absolute;
  bottom: 20px;
  left: 70px;
  width: 110px;
  height: 70px;

  button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin: 5px 0;
    border: none;
    border-radius: 15px;
    background-color: rgba(236, 118, 101, 0.8);
    box-sizing: 5px 5px 2px black;

    img {
      width: 24px;
      margin: 2px 8px 0 5px;
      filter: brightness(0) invert(1);
    }

    span {
      font-size: 19px;
      color: white;
    }
  }
`;

UserList.propTypes = {
  onSearchValue: PropTypes.func.isRequired,
};

export default UserList;
