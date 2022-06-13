import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import Group from "../components/Group/Group";
import InGame from "../components/Game/InGame";
import Error from "../components/Error/Error";
import TodoGroupModal from "../components/Modal/TodoGroupModal";
import GameResultModal from "../components/Modal/GameResultModal";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

import backgroundImg from "../assets/images/background.png";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const modalInfo = useSelector((state) => state.modalInfo);

  return (
    <MainStyle>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Main /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/group/:id"
            element={isLoggedIn ? <Group /> : <Navigate to="/login" replace />}
          />
          <Route path="/inGame" element={<InGame />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {modalInfo.todoModal && <TodoGroupModal />}
        {modalInfo.gameModal && <GameResultModal />}
        {modalInfo.confirmModal && <ConfirmationModal />}
      </Router>
    </MainStyle>
  );
};

const MainStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default App;
