import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalOverlay = styled.section`
  position: absolute;
  top: 0;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`

const ModalContainer = styled.section`
  position: absolute;
  background-color: ${props => props.theme.main};
  padding: 1.6rem 1.4rem;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(15%, 400px, 100%);
  color: ${props => props.theme.title};
  @media (width < 760px){
    top: 7rem;
    transform: translate(-50%, 0);
    /* min-width: 80%; */
  }
  & .close-modal{
    top: 0.25rem;
    right: 0.25rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
    color: ${props => props.theme.subTitle};
    transition: all .3s ease;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
    background: none;
    border-radius: 50%;
    
  }

`
const ModalContent = styled.section`

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & label{
    font-size: 0.8rem;
    font-weight: bold;
    color: ${props => props.theme.subTitle};
    margin-bottom: 0.4rem;
  }
  & button{
    padding: 0.4rem;
    border-radius: 1rem;
    cursor: pointer;
    background-color: ${props=> props.theme.addButton};
    color: ${(props) => (props.primary ? "white" : props.theme.darkBlue)}; 
    border: none;
    font-weight: 700;
    /* width: 100%; */
    
    &.primary{
      background-color: ${props => props.theme.darkBlue};
      color: white;
      transition: background-color .25s ease;
      &:hover{
        background-color: ${props => props.theme.lightBlue};
      }
    }
  }

  

  & .categories{
    display: flex;
    flex-direction: column;
    list-style: none;
    /* gap: 0.4rem; */
    
    li{
      width: 100%;
      display: flex;

      & > button{
        font-size: 2rem;
        font-weight: bold;
        /* padding: 0.5rem; */
        /* transform: rotate(45deg); */
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        /* height: 2rem; */
        padding: 0;
        color: ${props => props.theme.subTitle};
        transition: color 0.3s ease;
        &:hover{
          color: ${props => props.theme.darkBlue}
        }
        &:disabled{
          cursor: default;
          &:hover{
            color: ${props => props.theme.subTitle};

          }
        }
      }
 
    }
  }

  & .input{
    width: 100%;
    position: relative;
    & > span{
      position: absolute;
      color: ${props => props.theme.red};
      font-size: 0.8rem;
      right: 4px;
      bottom: 4px;
      font-weight: 600;
    }

    &.column,
    &.subtask{
      margin-bottom: 0.4rem;
    }

    & input,
    & textarea{
      background-color: ${props => props.theme.main};
      padding: 0.5rem;
      border-radius: 3px;
      outline: none;
      color: ${props => props.theme.title};
      border: 2px solid ${props => props.theme.subTitle};
      transition: border-color .25s ease;
      width: 100%;
      
      &:focus{
        border-color: ${props => props.theme.darkBlue};
      }
      &.error{
        border-color: ${props => props.theme.red};
      }
    }

    & textarea{
      min-height: 5rem;
      resize: vertical;
    }

    & select{
      width: 100%;
      background-color: ${props => props.theme.main};
      padding: 0.5rem;
      border-radius: 3px;
      outline: none;
      color: ${props => props.theme.title};
      border: 2px solid ${props => props.theme.subTitle};
      transition: border-color .25s ease;
      cursor: pointer;
      &:focus{
        border-color: ${props => props.theme.darkBlue};
      }
      &.error{
        border-color: ${props => props.theme.red};
      }
    
    }
  }

  & section.task-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1{
        font-size: 1.2rem;
      }
      
      button{
        padding: 0;
        background-color: ${props=> props.theme.main};
        &:hover{
          background-color: ${props=> props.theme.bg};
        }
      }
    }

    p{
      color: ${props => props.theme.subTitle};
    }

    & .subtasks-container{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      & .subtask-item{
        background-color: ${props=> props.theme.bg};
        padding: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.25s ease;
        display: flex;
        align-items: center;
        & span{
          margin-left: 0.5rem;
          font-weight: bold;
        }
        
        &:hover{
          opacity: 0.6;
        }
      }
      & .subtask-item.checked span{
          color: ${props => props.theme.subTitle};
          text-decoration: line-through;
      }
    }

    & .subtask-status{
      
    }
  }
  
`

export default function Modal(props){
  return createPortal(
    <ModalOverlay onClick={props.toggleState}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={props.toggleState}>+</button>
        <ModalContent >
          {props.children} 

        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
    ,
    document.querySelector(".App")
  )

}