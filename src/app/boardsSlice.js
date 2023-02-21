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


const initialState = normaliseData(data)
initialState.currentBoardId=initialState.boards[0]?.id
export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setCurrentBoard(state, action){
      state.currentBoardId = action.payload
    },
    addBoard(state, action){  
      if(!state.boards.find(board => board.name.toLowerCase() === action.payload.name.toLowerCase())){
        state.boards.push(action.payload)
      }
    },
    editBoard(state, action){
      return ({
        ...state,
        boards: state.boards.map(board => board.id === action.payload.id ? action.payload : board)
      })
    },
    delBoard(state, action){
      return (
        {
          ...state,
          boards: state.boards.filter(board => board.id !== action.payload),
          tasks: Object.fromEntries(Object.entries(state.tasks).filter(([key, value]) => value.boardId !== action.payload)),
        }
      )
    },
 
    addTask(state, action){
      const task = action.payload

      // add task id to entries
      const boardIndex = state.boards.findIndex(board => board.id === task.boardId)
      const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === task.statusId)
      state.boards[boardIndex].columns[columnIndex].task_entries.push(action.payload.id)
      
      state.tasks[task.id] = task
    },
    delTask(state, action){
      const task = action.payload
      
      state.boards?.find(board => board.id === state.currentBoardId)
                  .columns.find(column => column.id === task.statusId)
      
      const boardIndex = state.boards.findIndex(board => board.id === task.boardId)
      const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === task.statusId)
      const taskIdIndex = state.boards[boardIndex].columns[columnIndex].task_entries.indexOf(task.id)

      state.boards[boardIndex].columns[columnIndex].task_entries.splice(taskIdIndex, 1)
      
      delete state.tasks[task.id]
    },
    editTask(state, action){
      const task = action.payload
      state.tasks[task.id] = task
    },
    toggleSubtask(state, action){
      const task = action.payload
      state.tasks[task.id] = task
    },
    updateStatus(state, action){
      const task = action.payload

      //delete from the previous column task_entries
      const oldColumnId = state.tasks[task.id].statusId
      const boardIndex = state.boards.findIndex(board => board.id === task.boardId)
      const oldColumnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === oldColumnId)
      const taskIdIndex = state.boards[boardIndex].columns[oldColumnIndex].task_entries.indexOf(task.id)
      
      state.boards[boardIndex].columns[oldColumnIndex].task_entries.splice(taskIdIndex, 1)

      // add to new column task entries
      const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === task.statusId)
      state.boards[boardIndex].columns[columnIndex].task_entries.push(task.id)

      // add to tasks object
      state.tasks[task.id] = task
    }

  }
})

export const {setCurrentBoard, addBoard, delBoard, editBoard, addTask, delTask, toggleSubtaskFromTask, toggleSubtask, updateStatus, editTask} = boardsSlice.actions
export default boardsSlice.reducer