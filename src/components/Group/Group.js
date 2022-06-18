/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import UserList from "../UserList/UserList";
import TodoList from "../TodoList/TodoList";
import { addGroupMember } from "../../api/index";
import { fetchGroupInfo, fetchUserInfo } from "../../features/todoSlice";

const Group = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const groupInfo = useSelector((state) => state.groupInfo);

  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const getFilterValue = (result) => {
    setFilterValue(result);
  };

  const getSearchValue = (result) => {
    setSearchValue(result);
  };

  const handleAddGroupMember = async (groupId) => {
    const result = await addGroupMember(groupId);

    if (result.data.result === "success") {
      dispatch(
        fetchGroupInfo({
          searchValue,
          filterValue,
          isGroup: true,
          groupId: id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchGroupInfo({
        searchValue,
        filterValue,
        isGroup: true,
        groupId: id,
      })
    );
    dispatch(fetchUserInfo());
  }, [dispatch, searchValue, filterValue]);

  useEffect(() => {
    if (
      Object.keys(userInfo).length !== 0 &&
      Object.keys(groupInfo).length !== 0
    ) {
      const inCludesGroup = userInfo.groups.filter(
        (item) => item._id === groupInfo._id
      );
      const inCludesUser = groupInfo.members.filter(
        (item) => item._id === userInfo._id
      );

      if (inCludesGroup.length === 0 && inCludesUser.length === 0) {
        handleAddGroupMember(groupInfo._id);
      }
    }
  }, [userInfo, groupInfo]);

  return (
    <GroupStyle>
      <UserList onSearchValue={getSearchValue} />
      <TodoList onFilterValue={getFilterValue} />
    </GroupStyle>
  );
};

const GroupStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Group;
