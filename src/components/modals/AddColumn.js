import React from "react";
import Modal from "../../components/modals/Modal";
import { isDraft, nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {MdDeleteForever} from "react-icons/md"


export default function AddColumn({toggleState}){
  const dispatch = useDispatch()
  const boardsData = useSelector((state) => state.boards.boards)
  const currentBoardId = useSelector((state) => state.boards.currentBoardId)
  const currentBoard = boardsData.find(board => board.id === currentBoardId)

  const [columns, setColumns] = React.useState(currentBoard.columns)

  const columnsArr = columns.map((column, index) => {
    const disabled = currentBoard.columns.find(columnL => columnL.id === column.id)
    return (
      <li key={column.id} > 
      <div className="input column">
        <input 
          disabled={disabled}
          value={column.name}
          onChange={(e)=>handleColumnInputChange(index, e)}
        />
      </div>
      {columns.length > 1 &&
        <button onClick={()=>removeColumn(column.id)} disabled={disabled}><MdDeleteForever /></button>
      }
      </li>
    )
  })

  function handleColumnInputChange(index, e){
    console.log(columns)
    setColumns(prev => [
      ...prev,
      prev[index]= e.target.value
    ])
  }
  function removeColumn(id){
    setColumns(prev => prev.filter(column => column.id !== id))
  }
  function handleSubmit(){

  }
  function handleAddColumn(){
    setColumns(prev => prev.concat({ id: nanoid(), name: '', task_entries: []}))
  }

  return (
      <Modal toggleState={toggleState}>
        <h1>Add New Column</h1>
        <div className="input">
          <label htmlFor="name">Name</label>
          <input 
            disabled="true"
            value={currentBoard.name}      

          />
        </div>
        

        <ul className="categories columns">
          <label htmlFor="columns">Columns</label>
          {columnsArr}
        </ul>
        { columns.length < 7 &&
          <button onClick={()=>handleAddColumn()}>+ Add New Column</button>
        }
        <button className="primary" type="submit" onClick={handleSubmit()}>Save Changes</button>
      </Modal>     
    
  )

}