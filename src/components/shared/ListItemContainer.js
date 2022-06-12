import styled from "styled-components";

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 50px;
  margin: 2%;
  border: 3px solid #4a5280;
  border-radius: 10px;
  background-color: rgba(73, 37, 28, 0.05);
  box-shadow: 0px 3px 8px rgba(148, 148, 148, 0.2);

  label {
    display: flex;
    width: 34px;
    height: 30px;
    margin: 8px 10px;
    cursor: pointer;

    .todoCompleteBtn[type="checkbox"] {
      position: absolute;
      transform: scale(0);

      &:checked ~ .checkbox {
        transform: rotate(45deg);
        width: 20px;
        margin: -4px 7px 0 10px;
        border-color: #24c78e;
        border-width: 4px;
        border-top-color: transparent;
        border-left-color: transparent;
        border-radius: 0;
      }
    }

    .checkbox {
      display: block;
      width: inherit;
      height: inherit;
      border: 2px solid #999;
      border-radius: 4px;
      transition: all 0.2s cubic-bezier(0, 0.01, 0.23, 0.8);
    }
  }

  .titleBtn {
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    .title {
      width: 100%;
      padding: 5px 10px;
      text-align: left;
      font-size: 28px;
    }
  }

  .buttonContainer {
    display: flex;

    button {
      margin: 0 5px;
      border: none;
      background-color: transparent;
      cursor: pointer;

      img {
        width: 30px;
        filter: opacity(40%);
      }
    }
  }
`;

export default ListItemContainer;
