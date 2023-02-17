import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json"

const initialState = data
initialState.currentBoard="0"
export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setCurrentBoard(state, action){
      state.currentBoard = action.payload
    },
    addBoard(state, action){
      if(!state.boards.find(board => board.name.toLowerCase() === action.payload.name.toLowerCase())){
        state.boards.push(action.payload)
      }
    },
    editBoard(state, action){
      return ({
        ...state,
        boards: state.boards.map(board => board.id === action.payload.id ? action.payload : board)})
    },
    delBoard(state, action){
      if(state.boards.indexOf(board => board.id=== action.payload)){
        state.boards.splice(state.boards.indexOf(board => board.id=== action.payload), 1)
        state.currentBoard = state.boards?.[0]?.id || "No Board Found"
      }
    },
    addTask(state, action){
      const boardToAdd = state.boards.find(board => board.id === action.payload.board)

      if(!boardToAdd) return

      boardToAdd.columns
        .find(column => column.id === action.payload.task.statusId)
        ?.tasks.push(action.payload.task)

    }
  }
})

export const {setCurrentBoard, addBoard, delBoard, editBoard, addTask } = boardsSlice.actions
export default boardsSlice.reducer