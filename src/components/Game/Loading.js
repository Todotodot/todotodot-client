import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <>
      <ClockDiv>
        <div className="clock">
          <div className="second" />
        </div>
      </ClockDiv>
      <MessageDiv>
        <p className="title">모든 인원이 참여해야 몬스터가 나옵니다.</p>
        <p className="title">현재 인원 수</p>
        <p className="participants">
          props currentMembers.length / props group.members.length
        </p>
      </MessageDiv>
    </>
  );
};

const ClockDiv = styled.div`
  position: absolute;
  top: 40px;
  right: 50px;

  .clock {
    background: #ec7665;
    border-radius: 50%;
    box-sizing: border-box;
    height: 150px;
    margin: 0 auto;
    position: relative;
    width: 150px;
  }

  .second {
    height: 50px;
    width: 4px;
    background: #49251c;
    position: absolute;
    left: 50%;
    top: 25px;
    animation: tick 60s infinite linear;
    -webkit-animation: tick 60s infinite linear;
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

export default Loading;
