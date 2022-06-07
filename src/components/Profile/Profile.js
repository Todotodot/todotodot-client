import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Sprite from "react-responsive-spritesheet";

import Button from "../shared/Button";
import searchIcon from "../../assets/images/search-icon.png";
import orangeSlime from "../../assets/images/characters/orangeSlime_attack.png";

const Profile = () => {
  const [user, setUser] = useState();

  const axios = async () => {
    const result = await Axios.get("http://localhost:5000", {
      headers: { Authorization: `Bearer ${localStorage.getItem("profile")}` },
    });

    setUser(result.data.user);
  };

  useEffect(() => {
    axios();
  }, []);

  return (
    <ProfileStyle>
      <StatusBarContainer experience={user?.experience}>
        <StatusBar />
        {user?.experience}
      </StatusBarContainer>
      <UserContainer>
        <OrangeSlime
          image={orangeSlime}
          widthFrame={270}
          heightFrame={212}
          steps={3}
          fps={8}
          autoplay={true}
          loop={true}
        />
        <UserLevelContainer>
          <UserLevel>
            <div>Lv. </div>
            <div>{user?.level}</div>
          </UserLevel>
        </UserLevelContainer>
        <Username>{user?.name}</Username>
      </UserContainer>
      <SearchBarContainer>
        <img className="icon" src={searchIcon} alt="icon" />
        <SearchBar type="text" />
      </SearchBarContainer>
      <ButtonContainer>
        <Button>Personal Todo</Button>
        <Button>Group List</Button>
      </ButtonContainer>
    </ProfileStyle>
  );
};

export default Profile;

const StatusBar = styled.div``;
const OrangeSlime = styled(Sprite)``;
const UserLevelContainer = styled.div``;
const UserLevel = styled.div``;
const Username = styled.div``;
const SearchBar = styled.input``;

const ProfileStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100vh;
  background-color: #7877c1;
`;

const StatusBarContainer = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 20px;
  border-radius: 20px;
  margin-bottom: 7%;
  position: relative;
  background-color: white;
  text-align: center;
  line-height: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  ${StatusBar} {
    border-radius: 3px solid tomato;
    position: absolute;
    width: ${(props) => `${props.experience}%`};
    height: 100%;
    border-radius: 20px;
    background-color: green;
  }
`;

const UserContainer = styled.div`
  position: relative;
  width: 60%;
  height: 240px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  ${OrangeSlime} {
    width: 100%;
  }

  ${UserLevelContainer} {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${UserLevel} {
    position: absolute;
    width: 100px;
    height: 25px;
    line-height: 25px;
    background-color: #ec7665;
    text-align: center;
    border-radius: 20px;
    color: black;
    top: 180px;
    border: 2px solid #49251c;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      margin: 0px 3px 0px 3px;
    }
  }

  ${Username} {
    width: 100%;
    height: 24px;
    text-align: center;
    font-size: 25px;
  }
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: 13%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    width: 18px;
    position: absolute;
    left: 32px;
  }

  ${SearchBar} {
    width: 75%;
    height: 20px;
    border-radius: 7px;
    padding-left: 40px;
    background-color: rgba(255, 255, 255, 0.3);
    border: 3px solid #49251c;
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
    margin-top: 0px;
    margin: 6px;
    width: 280px;
    height: 45px;
  }
`;
