import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"
import Dropdown from "../shared/Dropdown";

function SubtaskCheckbox({subtask, handleClick}){
  return (
    <div className="subtask-item" onClick={handleClick} >
      <input type="checkbox" value={subtask.name} checked={subtask.isCompleted} onChange={handleClick}/>
      <span>{subtask.name}</span>
    </div>
  )

}

export default function ViewTask({toggleState, targetTask}){
  const dispatch = useDispatch()
  const currentBoardId = useSelector(state => state.boards.currentBoard)
  const currentBoard = useSelector(state => state.boards.boards.find(board => board.id === currentBoardId))

  const [task, setTask] = React.useState({
    id: targetTask.id,
    name: targetTask.name,
    desc: targetTask.desc,
    subtasks: targetTask.subtasks.map(item => (
      { name: item.name, isCompleted: item.isCompleted }
    )),
    status: targetTask.status,
    statusId: targetTask.statusId
  })

  function handleToggleSubtask(index){
    setTask(prev => (
      {
        // ...prev,
        // subtasks[index]: {
        //   ...prev.subtasks.subtask[index],
        //   isCompleted: !prev.subtasks.subtask[index].isCompleted
        // }
      }
    ))
    console.log(task)
  }
  const subtasks = task.subtasks.map((subtask, index) => (
    <SubtaskCheckbox key={subtask.name} subtask={subtask} handleClick={() => handleToggleSubtask(index)} />
  ))

  function handleStatusChange(e){
    console.log(e.target.id)
    setTask(prev=>(
      {
        ...prev,
        status: e.target.value,
        statusId: e.target.id
      }
    ))
    console.log(task)
  }
  function handleDelete(){

  }
  function handleEdit(){

  }

  return (
    <Modal toggleState={toggleState} > 
      
      <section className="task-container">
        <header>
          <h1>{task.name}</h1>
          <Dropdown name="task" deleteFunc={handleDelete} editFunc={handleEdit} />
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
              return <option key={column.id} id={column.id} value={column.name}>{column.name}</option>
            })}
          </select>
        </section>

      </section>
    </Modal>
  )

}