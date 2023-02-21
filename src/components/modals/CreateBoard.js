import React from "react";
import Modal from "../../components/modals/Modal";
import {MdDeleteForever} from "react-icons/md"
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../app/boardsSlice";
import BoardModal from "./BoardModal";

export default function CreateBoard({toggleState}){
  const dispatch = useDispatch()
  const boardsData = useSelector((state) => state.boards.boards)
  const tasks = useSelector(state => state.boards.tasks)

  const {register, handleSubmit, formState: {errors}, control} = useForm({
    defaultValues: {
      id: nanoid(),
      name: "",
      columns: [{id: nanoid(), name: "", task_entries: []}]
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
    return fields.filter(field => field.name === name).length > 1 ? false : true
  }
  
  function onSubmit(data, e){
    dispatch(addBoard(data))
    toggleState()
  }
 
  function handleAddColumn(){
    append({ id: nanoid(), name: '', task_entries: []})
  }
 
  const columns = fields.map((item, index) => {
    return (
      <li key={item.id} id={`${index}-item`}  > 
        <div className="input column">
          <input 
            className={errors.columns?.[index]?.name && "error"}
            {...register(`columns.${index}.name`, {
              required: true,
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
        <h1>Add New Board</h1>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input 
            className={errors?.name && "error"}
            {...register("name", { 
            required: true,
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