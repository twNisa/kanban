import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" }

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleTheme(state){
      console.log("state toggleTheme")
      state.theme === "light" ? state.theme = "dark" : state.theme = "light"
    }
  }
})

export const { toggleTheme } = preferencesSlice.actions
export default preferencesSlice.reducer