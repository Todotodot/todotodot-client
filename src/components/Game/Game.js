/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Sprite from "react-responsive-spritesheet";
import { debounce } from "lodash";

import { setModalInfo } from "../../features/todoSlice";

import inGameBackground from "../../assets/images/inGameBackground.png";
import boss from "../../assets/images/characters/HugeMushroom.png";
import earthWizardAttack from "../../assets/images/characters/EarthWizard-attack.png";

const Game = () => {
  const user = useSelector((state) => state.userInfo);
  const group = useSelector((state) => state.groupInfo);

  const { todoId, groupId } = useParams();
  const { members } = group;

  const [socket, setSocket] = useState(null);
  const [memberClick, setMembeClick] = useState({});
  const [memberCounter, setMemberCounter] = useState(0);
  const [userClick, setUserClick] = useState(0);
  const [totalClick, setTotalClick] = useState(0);
  const [loadingSecond, setLoadingSecond] = useState(1);
  const [gameSecond, setGameSecond] = useState(1);

  const assignedClick = 10;

  const [sprites, setSprites] = useState(null);
  const [bossSprite, setBossSprite] = useState(null);
  const [state, setState] = useState(false);

  const dispatch = useDispatch();

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

    socket.emit("gameRoom", { user, todoId });

    socket.on("documentData", (documentData) => {
      const { counter } = documentData;

      setMemberCounter(counter);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket || !groupId) {
      return;
    }

    if (members && members.length === memberCounter) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("loadingSecond", loadingSecond);
    }, 1000);

    socket.on("loadingSecond", (loadingSecondData) => {
      setLoadingSecond(loadingSecondData);
    });

    return () => clearInterval(interval);
  }, [socket, loadingSecond, memberCounter]);

  useEffect(() => {
    if (!socket || !groupId) {
      return;
    }

    if (members && members.length !== memberCounter) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("gameSecond", gameSecond);
    }, 1000);

    socket.on("gameSecond", (gameSecondData) => {
      setGameSecond(gameSecondData);
    });

    return () => clearInterval(interval);
  }, [socket, gameSecond, memberCounter]);

  useEffect(() => {
    if (!socket || !groupId) {
      return;
    }

    const memberClickHandler = (memberClickData) => {
      const newMemberData = Object.assign(memberClick, memberClickData);

      setMembeClick(newMemberData);
    };
    const totalClickHandler = (totalClickData) => setTotalClick(totalClickData);

    socket.on("memberClick", memberClickHandler);
    socket.on("totalClick", totalClickHandler);

    return () => {
      socket.off("memberClick", memberClickHandler);
      socket.off("totalClick", totalClickHandler);
    };
  }, [socket, userClick, totalClick]);

  const play = () => {
    if (!state) {
      sprites.play();
      bossSprite.setStartAt(4);
      bossSprite.setEndAt(8);
      bossSprite.goToAndPlay(4);

      setState(true);
    }
  };

  const pause = () => {
    sprites.pause();
    sprites.goToAndPause(1);

    setTimeout(() => {
      bossSprite.pause();
    }, 600);

    setState(false);
  };

  const click = () => {
    setUserClick(userClick + 1);

    if (groupId) {
      socket.emit("memberClick", {
        clickUsername: user.name,
        userClick,
      });
      socket.emit("totalClick", totalClick);
    }
  };

  const clickDebounce = useCallback(debounce(pause, 800), [
    sprites,
    bossSprite,
  ]);

  useEffect(() => {
    if (groupId) {
      const timeout = setTimeout(() => {
        if (members && members.length !== memberCounter) {
          dispatch(
            setModalInfo({
              propsCategory: "IncompleteGroupTODO",
              title: "미션 실패!",
              message: "제한 시간안에 모든 멤버가 참여하지 못했습니다.",
              gameModal: true,
            })
          );
        }
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [memberCounter]);

  useEffect(() => {
    if (groupId && totalClick === assignedClick) {
      if (members && members.length !== Object.keys(memberClick).length) {
        dispatch(
          setModalInfo({
            propsCategory: "IncompleteGroupTODO",
            title: "미션 실패!",
            message: "게임에 참여하지 않은 멤버가 있습니다.",
            gameModal: true,
          })
        );
      }
    }
  }, [totalClick, memberClick]);

  useEffect(() => {
    if (groupId && totalClick === assignedClick) {
      if (members && members.length === Object.keys(memberClick).length) {
        const { level, experience } = user;
        const userData = {
          level: experience === level - 1 ? level + 1 : level,
          experience: experience === level - 1 ? 0 : experience + 1,
        };

        dispatch(
          setModalInfo({
            propsCategory: "CompleteGroupTODO",
            title: "미션 완료!",
            message: "게임에 승리하였습니다.",
            todoId,
            groupId,
            userData,
            gameModal: true,
          })
        );
      }
    }
  }, [totalClick, memberClick]);

  useEffect(() => {
    if (!groupId && userClick === assignedClick) {
      const { level, experience } = user;
      const userData = {
        level: experience === level - 1 ? level + 1 : level,
        experience: experience === level - 1 ? 0 : experience + 1,
      };

      dispatch(
        setModalInfo({
          propsCategory: "CompleteTODO",
          title: "미션 완료!",
          message: "게임에 승리하였습니다.",
          todoId,
          userData,
          gameModal: true,
        })
      );
    }
  }, [userClick]);

  useEffect(() => {
    if (groupId && members && members.length === memberCounter) {
      if (totalClick !== assignedClick) {
        const timeout = setTimeout(() => {
          dispatch(
            setModalInfo({
              propsCategory: "IncompleteGroupTODO",
              title: "미션 실패!",
              message: "제한 시간안에 미션을 완료하지 못했습니다.",
              gameModal: true,
            })
          );
        }, 10000);

        return () => clearTimeout(timeout);
      }
    }
  }, [memberCounter, totalClick]);

  useEffect(() => {
    if (!groupId && userClick !== assignedClick) {
      const timeout = setTimeout(() => {
        dispatch(
          setModalInfo({
            propsCategory: "IncompleteTODO",
            title: "미션 실패!",
            message: "제한 시간안에 미션을 완료하지 못했습니다.",
            groupId,
            todoId,
            gameModal: true,
          })
        );
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [memberCounter, userClick]);

  return (
    <Background>
      <ClockDiv>
        <div className="clock">
          <div className="second" />
        </div>
      </ClockDiv>
      {groupId && members && members.length > memberCounter ? (
        <MessageDiv>
          <p className="loadingSecond">{loadingSecond}</p>
          <p className="title">모든 인원이 참여해야 몬스터가 나옵니다.</p>
          <p className="title">현재 인원 수</p>
          <p className="participants">
            {memberCounter} / {members.length}
          </p>
        </MessageDiv>
      ) : (
        <GameContainer>
          <StatusBarContainer totalClick={groupId ? totalClick : userClick}>
            <StatusBar />
          </StatusBarContainer>
          <p className="gameSecond">{gameSecond}</p>
          <CharactersContainer>
            <WizardAttack
              image={earthWizardAttack}
              widthFrame={480}
              heightFrame={590}
              steps={12}
              fps={15}
              autoplay={state}
              loop={true}
              getInstance={(spritesheet) => {
                setSprites(spritesheet);
              }}
            />
            <Boss
              image={boss}
              widthFrame={810}
              heightFrame={1300}
              steps={12}
              fps={8}
              startAt={1}
              endAt={4}
              autoplay={true}
              loop={true}
              getInstance={(spritesheet) => {
                setBossSprite(spritesheet);
              }}
              onMouseDown={play}
              onMouseUp={clickDebounce}
              onClick={click}
            />
          </CharactersContainer>
        </GameContainer>
      )}
      {groupId && (
        <MemberClickContainer>
          <ul>
            {members &&
              Object.keys(memberClick).map((member) => {
                return (
                  <li key={member}>
                    {member}
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .loadingSecond {
    color: white;
    font-size: 80px;
  }

  .title {
    color: white;
    font-size: 30px;
    margin-top: 25px;
  }

  .participants {
    color: white;
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

  .gameSecond {
    color: white;
    font-size: 80px;
  }
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
    width: ${(props) => `${100 - props.totalClick * 10}%`};
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
  cursor: pointer;
`;

const WizardAttack = styled(Sprite)`
  width: 200px;
  transform: translate3d(-400px, 350px, 0);
`;

const MemberClickContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 0px;
  background-color: white;
`;

export default Game;
