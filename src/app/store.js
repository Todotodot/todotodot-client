import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import todoSlice from "../features/todoSlice";

export const store = configureStore({
  reducer: todoSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
