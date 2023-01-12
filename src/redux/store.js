import { configureStore } from "@reduxjs/toolkit";
import getDataReducer from "../redux/slice/getData"
export const store = configureStore({
  reducer: {
    university: getDataReducer,
  },
});
