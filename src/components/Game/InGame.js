/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Sprite from "react-responsive-spritesheet";

import useTimeout from "../../hooks/useTimeout";

import inGameBackground from "../../assets/images/inGameBackground.png";
import boss from "../../assets/images/characters/hugeMushroom_attack2.png";

const InGame = ({ setGameResultModalOn }) => {
  const userId = localStorage.getItem("profile");
  const { todoId, groupId } = useParams();
  const [socket, setSocket] = useState(null);
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [userClick, setUserClick] = useState(0);
  const [memberClick, setMemeberClick] = useState({});
  const [totalClick, setTotalClick] = useState(0);
  const assignedClick = 100;
  const tempObj = {};

  if (groupId) {
    useTimeout(() => {
      if (group.members.length !== members.length) {
        setGameResultModalOn(true);
      }
    }, 30000);
  }

  if (totalClick === assignedClick) {
    if (groupId && group.members.length !== Object.keys(memberClick).length) {
      setGameResultModalOn(true);
    }

    setGameResultModalOn(true);
  }

  if (userClick === assignedClick) {
    setGameResultModalOn(true);
  }

  if (!groupId || group.members.length === members.length) {
    useTimeout(() => {
      setGameResultModalOn(true);
    }, 30000);
  }

  useEffect(() => {
    if (!groupId) {
      return;
    }

    const socketIo = io(process.env.REACT_APP_SERVER_URL);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !groupId) {
      return;
    }

    socket.on("userGroupData", (documentData) => {
      const { userData, groupData } = documentData;

      setMembers(...[members], userData);
      setGroup(groupData);
    });

    socket.emit("gameRoom", { userId, todoId, groupId });
  }, [socket, todoId]);

  useEffect(() => {
    if (!socket || !groupId) {
      return;
    }

    const memberClickHandler = (memberClickData) => {
      Object.assign(tempObj, memberClickData);
      setMemeberClick({ ...memberClick, ...tempObj });
    };
    const totalClickHandler = (totalClickData) => setTotalClick(totalClickData);

    socket.on("memberClick", memberClickHandler);
    socket.on("totalClick", totalClickHandler);

    return () => {
      socket.off("memberClick", memberClickHandler);
      socket.off("totalClick", totalClickHandler);
    };
  }, [socket]);

  return (
    <Background>
      <ClockDiv>
        <div className="clock">
          <div className="second" />
        </div>
      </ClockDiv>
      {groupId &&
        group.members.length >
          members.length(
            <MessageDiv>
              <p className="title">모든 인원이 참여해야 몬스터가 나옵니다.</p>
              <p className="title">현재 인원 수</p>
              <p className="participants">
                members.length / group.members.length
              </p>
            </MessageDiv>
          )}
      <GameContainer>
        <StatusBarContainer totalClick={groupId ? totalClick : userClick}>
          <StatusBar />
        </StatusBarContainer>
        <CharactersContainer>
          <Boss
            image={boss}
            widthFrame={1050}
            heightFrame={975}
            steps={8}
            fps={8}
            autoplay={true}
            loop={true}
            onClick={() => {
              setUserClick(userClick + 1);

              if (groupId) {
                socket.emit("memberClick", { username: userId, userClick });
                socket.emit("totalClick", totalClick);
              }
            }}
          />
        </CharactersContainer>
      </GameContainer>
      {groupId && (
        <MemberClickContainer>
          <ul>
            {members.map((member) => {
              return (
                <li>
                  {member.name}
                  {memberClick[member]}
                </li>
              );
            })}
          </ul>
        </MemberClickContainer>
      )}
    </Background>
  );
};

const StatusBar = styled.div``;

const Background = styled.div`
  background-image: url(${inGameBackground});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const ClockDiv = styled.div`
  position: absolute;
  top: 40px;
  right: 50px;

  .clock {
    background: #4969a3;
    border-radius: 50%;
    border: 3px solid #0a0a0a;
    box-sizing: border-box;
    height: 150px;
    margin: 0 auto;
    position: relative;
    width: 150px;
  }

  .second {
    height: 50px;
    width: 4px;
    background: #0a0a0a;
    position: absolute;
    left: 50%;
    top: 25px;
    animation: tick 30s infinite linear;
    -webkit-animation: tick 30s infinite linear;
    transform-origin: 2px 100%;
    -webkit-transform-origin: 2px 100%;
  }

  @keyframes tick {
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes tick {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const MessageDiv = styled.div`
  height: 720px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .title {
    font-size: 30px;
    margin-top: 25px;
  }

  .participants {
    font-size: 45px;
    margin-top: 40px;
  }
`;

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StatusBarContainer = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 20px;
  border-radius: 20px;
  margin-bottom: 7%;
  position: relative;
  background-color: white;
  overflow: hidden;
  text-align: center;
  line-height: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  ${StatusBar} {
    border-radius: 3px solid tomato;
    position: absolute;
    width: ${(props) => `${100 - props.totalClick}%`};
    height: 100%;
    border-radius: 20px;
    background-color: crimson;
  }
`;

const CharactersContainer = styled.div`
  margin-top: 200px;
`;

const Boss = styled(Sprite)`
  width: 300px;
`;

const MemberClickContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 0px;
  background-color: white;
`;

export default InGame;
