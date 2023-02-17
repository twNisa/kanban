import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { delBoard } from "../../app/boardsSlice";
import styled from "styled-components";


const DeleteContainer = styled.section`

  & > h1{
    color: ${props => props.theme.red};
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
  & p{
    color: ${props => props.theme.subTitle};
    font-size: 0.8rem;
  }

  & > div{
    margin-top: 1rem;
    display: flex;
    width: 100%;
    gap: 1rem;
    & > button{
      transition: opacity 0.3s ease;
      width: 100%;
    }
    & > button:hover{
      opacity: 0.6;
    }
    & > button:first-of-type{
      background-color: ${props => props.theme.red};
      color: white;
    }
  }
`


export default function DeleteBoard({toggleState}){
  const boardsData = useSelector((state) => state.boards)
  const currentBoardTitle = boardsData.boards.find((board) => board.id === boardsData.currentBoard).name
  const currentBoardId = boardsData.currentBoard
  const dispatch = useDispatch()
  function handleDelete(){
    dispatch(delBoard(currentBoardId))
    toggleState()
  }


  return (
    <Modal toggleState={toggleState} >
      <DeleteContainer>
        <h1 className="danger">Delete this board?</h1>
        <p>Are you sure you want to delete the `{currentBoardTitle}` board?</p>
        <p>This action will remove all data of the board and cannot be reversed.</p>

        <div className="deleteButtons">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleState}>Cancel</button>
        </div>
      </DeleteContainer>
     

    </Modal>
  )

}