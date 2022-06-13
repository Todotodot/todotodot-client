import styled from "styled-components";

const MainContiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .mainBody {
    width: 90%;
    height: 680px;
    border: 3px solid #49251c;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.92);

    .listBody {
      height: 80%;
      border-top: 1px solid rgba(73, 37, 28, 0.05);
      border-bottom: 1px solid rgba(73, 37, 28, 0.05);
      overflow: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: block;
        width: 14px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: transparent;
        box-shadow: inset 0 0 0 transparent;
      }

      &::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        border-radius: 10px;
        background-color: #49251c;
        background-clip: padding-box;
      }
    }
  }
`;
export default MainContiner;
