import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubtask, updateStatus } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"
import Dropdown from "../shared/Dropdown";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

function SubtaskCheckbox({subtask, handleClick}){
  return (
    <div className={subtask.isCompleted ? "checked subtask-item" : "subtask-item" } onClick={handleClick}  >
      <input type="checkbox"checked={subtask.isCompleted} />
      <span>{subtask.name}</span>
    </div>
  )

}

export default function ViewTask({toggleState, targetTask}){
  const dispatch = useDispatch()
  const currentBoardId = useSelector(state => state.boards.currentBoardId)
  const currentBoard = useSelector(state => state.boards.boards.find(board => board.id === currentBoardId))
  const currentTask = useSelector(state => state.boards.tasks[targetTask.id])
  const [deleteTaskOpen, setdeleteTaskOpen] = React.useState(false)
  const [editTaskOpen, setEditTaskOpen] = React.useState(false)


  const [task, setTask] = React.useState({
    id: currentTask.id,
    name: currentTask.name,
    desc: currentTask.desc,
    subtasks: currentTask.subtasks.map(item => (
      { name: item.name, isCompleted: item.isCompleted }
    )),
    status: currentTask.status,
    statusId: currentTask.statusId,
    boardId: currentTask.boardId
  })
  const didMount = React.useRef(false);
  const didMountStatus = React.useRef(false);
  
  const subtasks = task.subtasks.map((subtask) => (
    <SubtaskCheckbox key={subtask.name} subtask={subtask} handleClick={() => handleToggleSubtask(subtask.name)} />
  ))

  function handleToggleSubtask(name){
    const subtasks = task.subtasks.map( subtask => subtask.name === name ? {...subtask, isCompleted: !subtask.isCompleted} : subtask)
    setTask({...task, subtasks: subtasks})
    didMount.current = true
  }
  
  function handleStatusChange(e){
    console.log("Status change")
    setTask(prev=>(
      {
        ...prev,
        status: e.target.value,
        statusId: currentBoard.columns.find(column => column.name === e.target.value).id
      }
    ))
    didMountStatus.current = true


  }
  React.useEffect(()=>{
    if(didMount.current){
      dispatch(toggleSubtask(task))
    }
  }, [task.subtasks])

  React.useEffect(()=>{
    if(didMountStatus.current){
      dispatch(updateStatus(task))
    }
  }, [task.statusId])

  function handleDeleteTask(){
    setdeleteTaskOpen(prev => !prev)
  }
  function handleEditTask(){
    setEditTaskOpen(prev => !prev)
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
      {editTaskOpen &&
        <EditTask toggleState={handleEditTask} task={task} toggleParentState={toggleState}/>
      }
    </>
    
  )

}