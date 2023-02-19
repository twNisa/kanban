import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data.json"

function normaliseTasks(data){
  const tasks = {}
  data.boards.map(board => {
    const boardId = board.id
    board.columns.map(column => {
      const columnId = column.id
      column.tasks.map(task => {
        const taskI = {...task}
        taskI.boardId = boardId

        tasks[task.id] = taskI
      })
    })
  }) 
  return tasks
}

function normaliseBoards(data){
  const boards = []
  data.boards.map(board => {
    const boardId = board.id
    const boardInfo = {
      id: board.id,
      name: board.name,
      columns: board.columns.map(column => (
        {
          id: column.id,
          name: column.name,
          task_entries: column.tasks.map(task => task.id)
        }
      ))
    }
    boards.push(boardInfo)
  })
  return boards
}

function normaliseData(data){
  const boards = {
    boards: normaliseBoards(data),
    tasks: normaliseTasks(data)
  }
  return boards
}
console.log(normaliseData(data))


const initialState = normaliseData(data)
initialState.currentBoardId=initialState.boards[0]?.id
console.log(initialState)
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

    },
    delTask(state, action){
      const task = action.payload
      
     
    }
  }
})

export const {setCurrentBoard, addBoard, delBoard, editBoard, addTask, delTask } = boardsSlice.actions
export default boardsSlice.reducer