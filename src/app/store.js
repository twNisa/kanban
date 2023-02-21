import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice"
import preferencesReducer from "./preferencesSlice"
import { loadLocalStorage } from "../utils/localStorage"


const preloadedState = loadLocalStorage()

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    preferences: preferencesReducer,
  },
  preloadedState,
})