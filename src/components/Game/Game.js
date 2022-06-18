/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
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
import characterInfos from "../../utils/characterInfoList";

import inGameBackground from "../../assets/images/inGameBackground.png";
import boss from "../../assets/images/characters/HugeMushroom.png";

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

  const [sprites, setSprites] = useState([]);
  const [bossSprite, setBossSprite] = useState(null);
  const [state, setState] = useState(false);
  const [spriteInfos, setSpriteInfos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (groupId) {
      return;
    }

    const interval = setInterval(() => {
      setGameSecond(gameSecond + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameSecond]);

  useEffect(() => {
    if (!groupId) {
      const personalCharacterInfo = characterInfos(user.level);
      setSpriteInfos([personalCharacterInfo]);
      return;
    }

    const socketIo = io(process.env.REACT_APP_SERVER_URL);

    setSocket(socketIo);

    if (members) {
      const groupCharacterInfo = group.members.map((member) =>
        characterInfos(member.level)
      );
      setSpriteInfos(groupCharacterInfo);
    }

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

    return () => {
      clearInterval(interval);
    };
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

    return () => {
      clearInterval(interval);
    };
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
      sprites.forEach((item) => {
        item.play();
      });
      bossSprite.setStartAt(4);
      bossSprite.setEndAt(8);
      bossSprite.goToAndPlay(4);

      setState(true);
    }
  };

  const pause = () => {
    sprites.forEach((item) => {
      item.pause();
      item.goToAndPause(1);
    });

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

  const bossDeath = () => {
    bossSprite.setStartAt(8);
    bossSprite.setEndAt(11);
    bossSprite.goToAndPlay(8);

    setTimeout(() => {
      bossSprite.goToAndPause(11);
    }, 400);
  };

  const clickDebounce = useCallback(debounce(pause, 600), [
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
              todoId,
              groupId,
              gameModal: true,
            })
          );
        }
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
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
            todoId,
            groupId,
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
          groupId,
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
              todoId,
              groupId,
              gameModal: true,
            })
          );
        }, 10000);

        return () => {
          clearTimeout(timeout);
        };
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

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [memberCounter, userClick]);

  return (
    <Background>
      {groupId && members && members.length > memberCounter ? (
        <>
          <ClockDiv>{loadingSecond}</ClockDiv>
          <MessageDiv>
            <p className="title">모든 인원이 참여해야 몬스터가 나옵니다.</p>
            <p className="title">현재 인원 수</p>
            <p className="participants">
              {memberCounter} / {members.length}
            </p>
          </MessageDiv>
        </>
      ) : (
        <>
          <ClockDiv>{gameSecond}</ClockDiv>
          <GameContainer>
            <StatusBarContainer totalClick={groupId ? totalClick : userClick}>
              <StatusBar />
            </StatusBarContainer>
            <CharactersContainer>
              <div className="userCharactersContainer">
                {spriteInfos.length !== 0 &&
                  spriteInfos.map((item) => (
                    <Sprite
                      key={`${item.IMAGE}${item.NAME}`}
                      className={`sprite ${item.NAME}`}
                      image={item.IMAGE}
                      widthFrame={item.WIDTH}
                      heightFrame={item.HEIGHT}
                      steps={item.STEPS}
                      fps={item.FPS}
                      autoplay={state}
                      loop={true}
                      getInstance={(spritesheet) => {
                        setSprites((sprite) => [...sprite, spritesheet]);
                      }}
                    />
                  ))}
              </div>
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
        </>
      )}
      {groupId && (
        <MemberClickContainer>
          <ul>
            {members &&
              Object.keys(memberClick).map((member) => {
                return (
                  <li key={member}>
                    <span className="memberName">{member}</span>
                    <span className="memberCount">{memberClick[member]}</span>
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
  width: 100vw;
  height: 100vh;
  background-image: url(${inGameBackground});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ClockDiv = styled.div`
  color: white;
  position: absolute;
  top: 40px;
  right: 50px;
  font-size: 80px;
`;

const MessageDiv = styled.div`
  height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

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
  margin: 80px 0;
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
  position: relative;
  width: 100vw;
  height: 80vh;

  .userCharactersContainer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 100px;

    .sprite {
      position: absolute;
      bottom: 80px;
      left: 250px;
      width: 100px;
      /* padding: 0 100px; */
    }

    .slimeAttack {
    }

    .waterWizardAttack {
      position: absolute;
      bottom: 80px;
      left: 300px;
      width: 300px;
    }
  }
`;

const Boss = styled(Sprite)`
  position: absolute;
  bottom: 0;
  right: 50px;
  width: 300px;
  cursor: pointer;
`;

const MemberClickContainer = styled.div`
  position: absolute;
  top: 200px;
  left: -5px;
  width: 200px;
  height: auto;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;

    .memberName {
      margin: 5px 0;
      font-size: 20px;
      color: rgb(45, 45, 45);
    }

    .memberCount {
      margin: 0 10px;
      padding: 2px 10px;
      font-size: 20px;
      border-radius: 10px;
      color: rgb(45, 45, 45);
    }
  }
`;

export default Game;
