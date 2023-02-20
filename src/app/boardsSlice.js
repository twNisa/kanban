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
      state.currentBoardId = action.payload
    },
    addBoard(state, action){  
      console.log(action.payload)
      if(!state.boards.find(board => board.name.toLowerCase() === action.payload.name.toLowerCase())){
        state.boards.push(action.payload)
      }
    },
    editBoard(state, action){
      console.log(action.payload)
      return ({
        ...state,
        boards: state.boards.map(board => board.id === action.payload.id ? action.payload : board)
      })
    },
    delBoard(state, action){
      console.log(state.boards[0].id)
      return (
        {
          ...state,
          boards: state.boards.filter(board => board.id !== action.payload),
          tasks: Object.fromEntries(Object.entries(state.tasks).filter(([key, value]) => value.boardId !== action.payload)),
        }
      )
    },
    addColumn(state, action){

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
      console.log(task)
      
      state.boards?.find(board => board.id === state.currentBoardId)
                  .columns.find(column => column.id === task.statusId)
      
      const boardIndex = state.boards.findIndex(board => board.id === task.boardId)
      console.log(boardIndex)
      const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === task.statusId)
      const taskIdIndex = state.boards[boardIndex].columns[columnIndex].task_entries.indexOf(task.id)

      state.boards[boardIndex].columns[columnIndex].task_entries.splice(taskIdIndex, 1)
      
      delete state.tasks[task.id]
    },
    toggleSubtaskFromTask(state, action){
      const {task, index} = action.payload

    },
    toggleSubtask(state, action){
      const task = action.payload
      console.log(task)
      state.tasks[task.id] = task
    },
    updateStatus(state, action){
      console.log(action.payload)
      const task = action.payload

      //delete from the previous column task_entries
      const oldColumnId = state.task[task.id].statusId
      const boardIndex = state.boards.findIndex(board => board.id === task.boardId)
      console.log(boardIndex)
      const oldColumnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === oldColumnId)
      const taskIdIndex = state.boards[boardIndex].columns[oldColumnIndex].task_entries.indexOf(task.id)
      
      state.boards[boardIndex].columns[oldColumnIndex].task_entries.splice(taskIdIndex, 1)

      // add to new column task entries
      const columnIndex = state.boards[boardIndex].columns.findIndex(column => column.id === task.statusId)
      state.boards[boardIndex].columns[columnIndex].task_entries.push(task.id)

    }

  }
})

export const {setCurrentBoard, addBoard, delBoard, editBoard, addColumn, addTask, delTask, toggleSubtaskFromTask, toggleSubtask, updateStatus} = boardsSlice.actions
export default boardsSlice.reducer