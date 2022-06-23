import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import Sprite from "react-responsive-spritesheet";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import Button from "../shared/Button";
import { setModalInfo } from "../../features/todoSlice";

import searchIcon from "../../assets/images/icons/search-icon.png";
import settingIcon from "../../assets/images/icons/setting.png";
import soundOn from "../../assets/images/icons/sound-on.png";
import soundOff from "../../assets/images/icons/sound-off.png";
import blueSlimeIdle from "../../assets/images/characters/blueslime-idle.png";
import waterWizardIdle from "../../assets/images/characters/waterwizard-idle.png";

const Profile = ({ onSearchValue }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const [showSetting, setShowSetting] = useState(false);

  const handleClick = (mode) => {
    dispatch(
      setModalInfo({
        propsCategory: mode,
      })
    );
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
    <ProfileStyle>
      <StatusBarContainer experience={user?.experience}>
        <div className="statusBar" />
        <span className="statusText">
          {`${user?.experience}/${user?.level}`}
        </span>
      </StatusBarContainer>
      <UserContainer>
        <div className="profile">
          {user && user.level < 5 && (
            <SlimeIdle
              image={blueSlimeIdle}
              widthFrame={240}
              heightFrame={210}
              steps={5}
              fps={5}
              autoplay={true}
              loop={true}
            />
          )}
          {user && user.level === 20 && (
            <WizardIdle
              image={waterWizardIdle}
              widthFrame={240}
              heightFrame={330}
              steps={5}
              fps={8}
              autoplay={true}
              loop={true}
            />
          )}
        </div>
        <div className="userLevelContainer">
          <UserLevel>
            Lv.
            {user?.level}
          </UserLevel>
        </div>
        <div className="userName">{user?.name}</div>
      </UserContainer>
      <SearchBarContainer>
        <img className="icon" src={searchIcon} alt="icon" />
        <input type="text" className="searchBar" onChange={debounceSearch} />
      </SearchBarContainer>
      <ButtonContainer>
        <Button onClick={() => handleClick("TODO")}>Personal Todo</Button>
        <Button onClick={() => handleClick("Group")}>Group List</Button>
      </ButtonContainer>
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
    </ProfileStyle>
  );
};

const ProfileAnimation = keyframes`
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

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(169, 170, 188, 0.5);
  animation: ${ProfileAnimation} 0.6s linear;

  .settingBtn {
    position: absolute;
    bottom: 10px;
    left: 10px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      animation: ${SettingBtnAnimation} 0.6s linear;
    }

    img {
      width: 40px;
      filter: opacity(90%);
    }
  }
`;

const StatusBarContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 80%;
  height: 16px;
  margin-bottom: 20%;
  border-radius: 50px;
  background-color: white;
  text-align: center;
  box-shadow: 0px 3px 8px rgba(148, 148, 148, 0.2);

  .statusBar {
    position: absolute;
    top: 0;
    left: -1px;
    width: ${(props) => `${0 + props.experience * 5}%`};
    height: 100%;
    border-radius: 15px;
    background-color: #40d65e;
  }

  .statusText {
    position: absolute;
    top: -2px;
    right: 45%;
    font-size: 19px;
    font-weight: bold;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: 60%;
  height: 240px;
  margin-bottom: 5%;

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 55px 0;
    border: 3px solid #49251c;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .userLevelContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
  }

  .userName {
    width: 100%;
    height: 24px;
    margin: 30px 0 10px 0;
    text-align: center;
    font-size: 25px;
  }
`;

const SlimeIdle = styled(Sprite)`
  width: 45%;
  padding: 15px 5px;
`;

const WizardIdle = styled(Sprite)`
  width: 40%;
`;

const UserLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 25px;
  border: 2px solid #49251c;
  border-radius: 20px;
  background-color: #ec7665;
  text-align: center;
  line-height: 25px;
  font-size: 24px;
  color: #2e2e2e;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  div {
    margin: 0px 3px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;

  Button {
    width: 280px;
    height: 45px;
    margin-top: 0px;
    margin: 6px;
  }
`;

const SettingContainer = styled.div`
  display: ${(props) => `${props.isShow}`};
  position: absolute;
  bottom: 18px;
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

    img {
      width: 24px;
      margin: 2px 8px 0 5px;
      filter: brightness(0) invert(1);
    }

    span {
      font-size: 17px;
      color: white;
    }
  }
`;

Profile.propTypes = {
  onSearchValue: PropTypes.func.isRequired,
};

export default Profile;
