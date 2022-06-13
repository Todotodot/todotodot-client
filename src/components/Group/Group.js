import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../shared/Button";
import UserList from "../UserList/UserList";
import TodoList from "../TodoList/TodoList";
import { authorization, fetchGroupInfo } from "../../features/todoSlice";
import { firebaseAuth } from "../../config/firebase";
import catchAsync from "../../utils/catchAsync";

const Group = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
      fetchGroupInfo({
        searchValue,
        filterValue,
        isGroup: true,
        groupId: id,
      })
    );
  }, [dispatch, searchValue, filterValue]);

  return (
    <GroupStyle>
      <Button className="logoutBtn" onClick={() => handleLogout()}>
        Logout
      </Button>
      <UserList onSearchValue={getSearchValue} />
      <TodoList onFilterValue={getFilterValue} />
    </GroupStyle>
  );
};

const GroupStyle = styled.div`
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

export default Group;
