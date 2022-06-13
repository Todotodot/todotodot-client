import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../shared/Button";
import Profile from "../Profile/Profile";
import TodoList from "../TodoList/TodoList";
import GroupList from "../GroupList/GroupList";
import { firebaseAuth } from "../../config/firebase";
import { authorization, fetchUserInfo } from "../../features/todoSlice";
import catchAsync from "../../utils/catchAsync";

const Main = () => {
  const navigate = useNavigate();
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

  const handleLogout = catchAsync(async () => {
    await firebaseAuth.signOut();

    localStorage.removeItem("profile");

    if (!localStorage.getItem("profile")) {
      dispatch(authorization());
      navigate("/login");
    }
  });

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
      <Button className="logoutBtn" onClick={() => handleLogout()}>
        Logout
      </Button>
      <Profile onSearchValue={getSearchValue} />
      {modalInfo.propsCategory.includes("TODO") && (
        <TodoList onFilterValue={getFilterValue} />
      )}
      {modalInfo.propsCategory.includes("Group") && <GroupList />}
    </MainStyle>
  );
};

const MainStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  .logoutBtn {
    position: absolute;
    top: -70px;
    right: 10px;
    width: 120px;
    height: 35px;
  }
`;

export default Main;
