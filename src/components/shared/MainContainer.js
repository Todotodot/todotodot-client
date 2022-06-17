import styled from "styled-components";

const MainContiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .mainBody {
    position: relative;
    width: 90%;
    height: 80vh;
    border: 3px solid #49251c;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.92);

    .listBody {
      height: 67vh;
      border-top: 1px solid rgba(73, 37, 28, 0.05);
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
