import React from "react";
import Modal from "../../components/modals/Modal";
import {MdDeleteForever} from "react-icons/md"
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../app/boardsSlice";
import BoardModal from "./BoardModal";

export default function AddColumn({toggleState}){
  const dispatch = useDispatch()
  const boardsData = useSelector((state) => state.boards.boards)
  const currentBoard = boardsData.find(board => board.id === useSelector(state => state.currentBoard))

  const {register, handleSubmit, formState: {errors}, control} = useForm({
    defaultValues: {
      id: currentBoard.id,
      name: currentBoard.name,
      columns: [...currentBoard.columns]
    }
  })
  const {fields, append, remove} = useFieldArray({
    control,
    name: "columns"
  })

  function isDuplicateBoard(name){ 
    return boardsData.find(board => board.name.toLowerCase() === name.toLowerCase()) ? false : true
  }

  function isDuplicateColumn(name){
    console.log(fields)
    return fields.find(column => column.name === name) ? false : true
  }
  
  function onSubmit(data, e){
    dispatch(addBoard(data))
    toggleState()
  }
 
  function handleAddColumn(){
    append({ id: nanoid(), name: '', tasks: []})
    console.log(fields)
  }
 
  const columns = fields.map((item, index) => {
    return (
      <li key={item.id} id={`${index}-item`}  > 
        <div className="input column">
          <input 
            className={errors.columns?.[index]?.name && "error"}
            {...register(`columns.${index}.name`, {
              required: true,
              disabled: true,
              validate: {
                duplicate: (value) => isDuplicateColumn(value)
              }
            })}
          />
          {errors.columns?.[index]?.name?.type ==="required" && <span className="error-input">Name Required</span>}
          {errors.columns?.[index]?.name?.type ==="duplicate" && <span className="error-input">Name Duplicate</span>}
        </div>
        {fields.length > 1 &&
          <button onClick={()=>remove(index)}><MdDeleteForever /></button>
        }
      </li>
    )
  })

  return (
      <Modal  toggleState={toggleState}>
        <h1>Add New Column</h1>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input 
            className={errors?.name && "error"}
            {...register("name", { 
            required: true,
            disabled: true,
            validate: {
              duplicate: (value) => isDuplicateBoard(value)
            }
          })} />
          {errors.name?.type==="required" && <span className="error-input">Name Required</span>}
          {errors.name?.type==="duplicate" && <span className="error-input">Name Duplicate</span>}
        </div>
        

        <ul className="categories columns">
          <label htmlFor="columns">Columns</label>
          {columns}
        </ul>
        { fields.length < 7 &&
          <button onClick={()=>handleAddColumn()}>+ Add New Column</button>
        }
        <button className="primary" type="submit" onClick={handleSubmit(onSubmit)}>Create New Board</button>
      </Modal>     
    
  )

}