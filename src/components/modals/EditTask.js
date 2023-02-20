import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { editTask, updateStatus } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"


export default function EditTask({toggleState, task, toggleParentState}){
  const dispatch = useDispatch()
  const currentBoardId = useSelector((state) => state.boards.currentBoardId)
  const currentBoard = useSelector((state) => state.boards.boards.find(board => board.id === currentBoardId))

  const {register, handleSubmit, formState: {errors, dirtyFields}, control} = useForm({
    defaultValues: {
      ...task
    }
  })
  const {fields, append, remove} = useFieldArray({
    control,
    name: "subtasks"
  })

  function isDuplicateSubtask(name, formValues){
    console.log(formValues)
    const count = formValues.subtasks.filter(subtask => subtask.name === name).length
    return (count > 1) ? false : true
  }

  function onSubmit(data, e){
    console.log(data)
    console.log(currentBoard.columns.find(column => column.name === data.status)?.id)
    const task = {
      ...data,
      statusId: currentBoard.columns.find(column => column.name === data.status)?.id
    }
    console.log(task)
    dispatch(updateStatus(task))
    dispatch(editTask(task))
    toggleState()
    toggleParentState()
  }
  function onError(error, e){
    console.log(error)
  }
 
  function handleAddSubtask(){
    append({name: "", isCompleted: false})
  }
 
  const subtasks = fields.map((subtask, index) => {
    return (
      <li key={subtask.id} id={`${index}-subtask`} >
        <div className="input subtask">
        <input 
            className={errors.subtasks?.[index]?.name && "error"}
            {...register(`subtasks.${index}.name`, {
              required: true,
              validate: {
                duplicate: (value, formValues) => isDuplicateSubtask(value, formValues)
              }
            })}
          />
          {errors.subtasks?.[index]?.name?.type ==="required" && <span className="error-input">Name Required</span>}
          {errors.subtasks?.[index]?.name?.type ==="duplicate" && <span className="error-input">Name Duplicate</span>}
        </div>
        <button onClick={()=>remove(index)}><MdDeleteForever /></button>
      </li>
    )
  })

  return (
    <Modal toggleState={toggleState} > 
        <h1>Add New Task</h1>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input 
            className={errors?.name && "error"}
            {...register("name", { 
            required: true,
          })} />
          {errors.name?.type==="required" && <span className="error-input">Name Required</span>}
          {errors.name?.type==="duplicate" && <span className="error-input">Name Duplicate</span>}
        </div>
        <div className="input">
          <label htmlFor="desc">Desc</label>
          <textarea {...register("desc")} />
        </div>

        <ul className="categories subtasks">
          <label htmlFor="subtasks">Subtasks</label>
          {subtasks}
        </ul>
        { fields?.length < 7 &&
          <button onClick={()=>handleAddSubtask()}>+ Add New Subtask</button>
        }
        <div className="input">
          <label htmlFor="subtasks">Status</label>
          <select 
            className={errors?.status && "error"}
            {...register("status", {required: true})}
          >
            {currentBoard.columns.map((status, index) => {
              return <option key={status.id} id={status.id} value={status.name} selected={index === 0 ? "selected" : ""}>{status.name}</option>
            })}
          </select>
          {errors.status?.type==="required" && <span className="error-input">Status Required</span>}
        </div>
        
        <button ctype="submit" onClick={toggleState}>Cancel</button>
        <button className="primary" type="submit" onClick={handleSubmit(onSubmit, onError)}>Save Changes</button>
    </Modal>
  )

}