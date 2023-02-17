import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice"
import preferencesReducer from "./preferencesSlice"

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    preferences: preferencesReducer,
  }
})