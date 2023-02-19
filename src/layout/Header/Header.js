import React from 'react'
import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import logoMobile from '../../assets/logo-mobile.svg';
import { HeaderContainer, BoardHeading } from './HeaderElements';
import { Button } from '../../components/shared/Button'
import Dropdown from '../../components/shared/Dropdown';
import { useSelector } from 'react-redux';
import AddTask from '../../components/modals/AddTask';
import DeleteBoard from '../../components/modals/DeleteBoard';
import EditBoard from '../../components/modals/EditBoard';

function Header() {
  const colorTheme = useSelector((state) => state.preferences.theme)
  const logoImg = colorTheme === "light" ? logoDark : logoLight
  const boardsData = useSelector((state) => state.boards)
  // const currentBoardTitle = boardsData?.boards?.find((board) => board.id === boardsData.currentBoard)?.name
  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const [deleteBoardOpen, setdeleteBoardOpen] = React.useState(false)
  const [editBoardOpen, setEditBoardOpen] = React.useState(false)


  function handleEditBoard(){
    setEditBoardOpen(prev => !prev)
  }

  function handleDeleteBoard(){
    setdeleteBoardOpen(prev => !prev)
  }
  function handleAddTask(){
    setCreateModalOpen(prev => !prev)
  }

  return (
    <HeaderContainer>
      <picture>
        <source srcSet={logoMobile} media='(max-width: 760px)' />
        <img src={logoImg} />
      </picture>
      <BoardHeading>
        {
          boardsData.boards.length > 0 ? 
          <>
          <h1>{boardsData?.boards?.find((board) => board.id === boardsData.currentBoard)?.name}</h1>
          <div className='buttons'>
            <Button type='button' className='button' onClick={handleAddTask}>
              + <span>Add New Task</span>
            </Button>
            <Dropdown 
              name="Board" 
              editFunc={handleEditBoard} 
              deleteFunc={handleDeleteBoard} 
            />
          </div>
          </>
          : <h1>No Board Found</h1>
        }
        
      </BoardHeading>
      
      {createModalOpen && 
        <AddTask toggleState={handleAddTask} />
      }
      {deleteBoardOpen && 
        <DeleteBoard toggleState={handleDeleteBoard} />
      }
      {editBoardOpen && 
        <EditBoard toggleState={handleEditBoard} />
      }
      

    </HeaderContainer>
  )
}

export default Header