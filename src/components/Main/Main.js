import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Profile from "../Profile/Profile";
import TodoList from "../TodoList/TodoList";
import GroupList from "../GroupList/GroupList";

import { fetchUserInfo } from "../../features/todoSlice";

const Main = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const modalInfo = useSelector((state) => state.modalInfo);

  const getFilterValue = (result) => {
    setFilterValue(result);
  };

  const getSearchValue = (result) => {
    setSearchValue(result);
  };

  useEffect(() => {
    dispatch(
      fetchUserInfo({
        searchValue,
        filterValue,
        isGroup: modalInfo.propsCategory.includes("Group") || false,
        groupId: "",
      })
    );
  }, [dispatch, searchValue, filterValue]);

  return (
    <MainStyle>
      <Profile onSearchValue={getSearchValue} />
      <div className="ListContainer">
        {modalInfo.propsCategory.includes("TODO") && (
          <TodoList onFilterValue={getFilterValue} />
        )}
        {modalInfo.propsCategory.includes("Group") && <GroupList />}
      </div>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  display: flex;

  .ListContainer {
    width: 100vw;
    height: 100vh;
  }
`;

export default Main;
