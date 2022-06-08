import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import InGame from "../components/Game/InGame";
import Loading from "../components/Game/Loading";
import GroupList from "../components/GroupList/GroupList";
import TodoGroupModal from "../components/Modal/TodoGroupModal";
import GameResultModal from "../components/Modal/GameResultModal";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import TodoList from "../components/TodoList/TodoList";
import UserList from "../components/UserList/UserList";
import Error from "../components/Error/Error";

const App = () => {
  const [todoGroupModalOn, setTodoGroupModal] = useState(false);
  const [gameResultModalOn, setGameResultModalOn] = useState(false);
  const [confirmationModalOn, setConfirmationModalOn] = useState(false);

  return (
    <Main>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inGame" element={<InGame />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/groupList" element={<GroupList />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {todoGroupModalOn && <TodoGroupModal setModalOn={setTodoGroupModal} />}
        {gameResultModalOn && (
          <GameResultModal setModalOn={setGameResultModalOn} />
        )}
        {confirmationModalOn && (
          <ConfirmationModal setModalOn={setConfirmationModalOn} />
        )}
      </Router>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #7877c1;
`;

export default App;
