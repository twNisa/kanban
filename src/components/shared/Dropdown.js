import styled from "styled-components"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import React from 'react'
import {BsThreeDotsVertical} from "react-icons/bs"


const DropdownContainer = styled.section`
  position: relative;
  z-index: 999;
  & > button{
    border: none;
    background-color: ${props => props.theme.main};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    border-radius: 10px;
    transition: background-color .25s ease;
    padding: 1rem 0rem;
    
    & svg{
      color: ${props => props.theme.subTitle};
      font-size: 1.2rem;
      border-radius: 50px;
    }

    &:hover{
      background-color: ${props => props.theme.ellipsis}
    }
  }

  &>div{
    background-color: ${props => props.theme.board};
    padding: 0.8rem;
    position: absolute;
    top: 140%;
    right: 0;
    border-radius: 5px;
    display: flex;
    gap: 0.8rem;
    flex-direction: column;
    width: 8rem;
    align-items: flex-start;
    transition: opacity .25s ease;
    box-shadow: 0px 0px 3px lightgray;

    & > button{
      font-weight: 500;
      cursor: pointer;
      background:none;
      color: ${props => props.theme.subTitle};
      border: none;
    }
    & > button.caution{
      color: ${props => props.theme.red};
    }
    & > button:hover{
      opacity: 0.6;
    }
  }
`

function Dropdown(props) {
  const { name, editFunc, deleteFunc } = props

  const ref = React.useRef(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  function handleEdit(){
    setIsModalOpen(false)
    editFunc()
  }
  
  function handleDelete(){
    setIsModalOpen(false)
    deleteFunc()
  }
  const handleClickOutside = () => {
    console.log('outside')
    setIsModalOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <DropdownContainer>
      <button
        onClick={() => setIsModalOpen(prev => !prev)}
      >
        <BsThreeDotsVertical />
      </button>
      {isModalOpen && (
        <div>
          <button onClick={handleEdit}>
            Edit {name}
          </button>
          <button className="caution" onClick={handleDelete} >
            Delete {name}
          </button>
        </div>
      )}
    </DropdownContainer>
  )
}

export default Dropdown