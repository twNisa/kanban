import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"


export default function ViewTask({toggleState, targetTask}){
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
  return (
    <Modal toggleState={toggleState} > 
        <h1></h1>
        <div className="view">
          <p>

          </p>
        </div>
        
        <ul className="categories subtasks">
          <label htmlFor="subtasks">{`Subtasks `}</label>
          {/* {subtasks} */}
        </ul>
      
        <div className="view">
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