import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Login";
import { store } from "../../app/store";

test("rendering login page", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const loginButtonText = screen.getByText("Sign in with Google account");
  expect(loginButtonText).toBeInTheDocument();
});
