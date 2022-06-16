import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, getGroupInfo } from "../api/index";
import todosFilter from "../utils/todosFilter";

export const fetchUserInfo = createAsyncThunk(
  "todoSlice/fetchUserInfo",
  async (filterInfo) => {
    const userInfo = await getUserInfo();

    if (!filterInfo) {
      return userInfo.data.user;
    }

    return todosFilter(userInfo.data.user, filterInfo);
  }
);

export const fetchGroupInfo = createAsyncThunk(
  "todoSlice/fetchGroupInfo",
  async (filterInfo) => {
    const groupInfo = await getGroupInfo(filterInfo.groupId);

    if (filterInfo.propsCategory) {
      return groupInfo.data.data.group;
    }

    return todosFilter(groupInfo.data.data.group, filterInfo);
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    userInfo: {},
    groupInfo: {},
    isLoggedIn: localStorage.getItem("profile") || false,
    modalInfo: {
      propsCategory: "TODO",
    },
  },
  reducers: {
    authorization(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setModalInfo(state, action) {
      state.modalInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    [fetchGroupInfo.fulfilled]: (state, action) => {
      state.groupInfo = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { authorization, setModalInfo } = todoSlice.actions;

export default todoSlice.reducer;
