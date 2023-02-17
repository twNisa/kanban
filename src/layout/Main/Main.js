import React from 'react'
import SideNav from '../../components/Main/SideNav/SideNav'
import { MainContainer } from './MainElements'
import Board from '../../components/Main/Board/Board'
import Modal from '../../components/modals/Modal'
function Main() {
  const [isSidebar, setIsSidebar] = React.useState(true)
  const [openCreateBoard, setOpenCreateBoard] = React.useState(false)

  function handleToggleSidebar(){
    setIsSidebar(prev => !prev)
  }
  function handleOpenCreateBoard(){
    setOpenCreateBoard(true)
  }

  return (
    <MainContainer>
      <SideNav isSidebar={isSidebar} toggleSidebar={handleToggleSidebar} toggleCreateBoard={handleOpenCreateBoard} />
      <Board isSidebar={isSidebar} />
    </MainContainer>
  )
}

export default Main