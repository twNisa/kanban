import React from "react";
import Modal from "../../components/modals/Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"


export default function AddTask({toggleState}){
  const dispatch = useDispatch()
  const currentBoardId = useSelector((state) => state.boards.currentBoard)
  const currentBoard = useSelector((state) => state.boards.boards.find(board => board.id === currentBoardId))

  const {register, handleSubmit, formState: {errors}, control} = useForm({
    defaultValues: {
      id: nanoid(),
      name: "",
      desc: "",
      statusId: "",
      status: "",
      subtasks: [{name: "", isCompleted: false}]
    }
  })
  const {fields, append, remove} = useFieldArray({
    control,
    name: "subtasks"
  })

  function isDuplicateName(name){ 
    return currentBoard.columns.find(column => {
      return column.tasks.find(task => task.name.toLowerCase()  === name.toLowerCase())
    }) ? false : true
  }
  function isDuplicateSubtask(name, field){
    console.log(fields)
    return fields.find(subtask => {
      if(field.id === subtask.id) return;
      return subtask.name.toLowerCase() === name.toLowerCase()})
  }

  function onSubmit(data, e){
    const task = {
      task: {
        ...data,
        statusId: currentBoard.columns.find(column => column.name === data.status)?.id
      },
      board: currentBoard.id,
    }
    dispatch(addTask(task))
    console.log(task)
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
                duplicate: (value, field) => isDuplicateSubtask(value, field)
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
            validate: {
              duplicate: (value) => isDuplicateName(value)
            }
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
          <select {...register("status")}>
            {currentBoard.columns.map((status, index) => {

              return <option key={status.id} id={status.id} value={status.name} selected={index === 0 ? "selected" : ""}>{status.name}</option>
            })}
          </select>
        </div>
        

        <button className="primary" type="submit" onClick={handleSubmit(onSubmit, onError)}>Create Task</button>
    </Modal>
  )

}