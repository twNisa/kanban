import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"
import Dropdown from "../shared/Dropdown";
import DeleteTask from "./DeleteTask";

function SubtaskCheckbox({subtask, handleClick}){
  return (
    <div className={subtask.isCompleted ? "checked subtask-item" : "subtask-item" } onClick={handleClick} >
      <input type="checkbox" value={subtask.name} checked={subtask.isCompleted} onChange={handleClick}/>
      <span>{subtask.name}</span>
    </div>
  )

}

export default function ViewTask({toggleState, targetTask}){
  const dispatch = useDispatch()
  const currentBoardId = useSelector(state => state.boards.currentBoardId)
  const currentBoard = useSelector(state => state.boards.boards.find(board => board.id === currentBoardId))
  const [deleteTaskOpen, setdeleteTaskOpen] = React.useState(false)
  const [editTaskOpen, setEditTaskOpen] = React.useState(false)


  const [task, setTask] = React.useState({
    id: targetTask.id,
    name: targetTask.name,
    desc: targetTask.desc,
    subtasks: targetTask.subtasks.map(item => (
      { name: item.name, isCompleted: item.isCompleted }
    )),
    status: targetTask.status,
    statusId: targetTask.statusId,
    boardId: targetTask.boardId
  })

  function handleToggleSubtask(index){
    setTask(prev => (
      {
        ...prev,
        subtasks: [
          ...prev.subtasks,
          subtasks[index].isCompleted = !subtasks[index].isCompleted
        ] 
      }
    ))
    console.log(task)
  }
  const subtasks = task.subtasks.map((subtask, index) => (
    <SubtaskCheckbox key={subtask.name} subtask={subtask} handleClick={() => handleToggleSubtask(index)} />
  ))

  function handleStatusChange(e){
    setTask(prev=>(
      {
        ...prev,
        status: e.target.value,
        statusId:  currentBoard.columns.find(column => column.name === e.target.value).id
      }
    ))
    console.log(task)
  }
  function handleDeleteTask(){
    setdeleteTaskOpen(prev => !prev)

  }
  function handleEditTask(){

  }

  return (
    <>
      <Modal toggleState={toggleState} > 
        <section className="task-container">
          <header>
            <h1>{task.name}</h1>
            <Dropdown name="task" deleteFunc={handleDeleteTask} editFunc={handleEditTask} />
          </header>
          <p>{task.desc ? task.desc : "No Description"}</p>

          <section className="subtasks-container">
            <h2>Subtask {`${task.subtasks.filter(subtask => subtask.isCompleted).length} of ${task.subtasks.length}`}</h2>
            {subtasks}
          </section>

          <section className="subtask-status input">
            <h2>Current Status</h2>
            <select value={task.status} onChange={handleStatusChange}>
              {currentBoard.columns.map((column) => {
                return <option key={column.id} value={column.name}>{column.name}</option>
              })}
            </select>
          </section>
        </section>
      </Modal>
      {deleteTaskOpen && 
        <DeleteTask toggleState={handleDeleteTask} task={task} toggleParentState={toggleState}/>
      }
    </>
    
  )

}