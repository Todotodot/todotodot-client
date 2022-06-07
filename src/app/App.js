import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import InGame from "../components/Game/InGame";
import Loading from "../components/Game/Loading";
import GroupList from "../components/GroupList/GroupList";
import Modal from "../components/Modal/Modal";
import TodoList from "../components/TodoList/TodoList";
import UserList from "../components/UserList/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/inGame" element={<InGame />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/groupList" element={<GroupList />} />
      </Routes>
    </Router>
  );
}

export default App;
