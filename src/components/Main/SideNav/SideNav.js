import React from 'react'
import iconHide from "../../../assets/icon-hide-sidebar.svg";
import iconSun from "../../../assets/icon-light-theme.svg";
import iconMoon from "../../../assets/icon-dark-theme.svg";
import iconShow from "../../../assets/icon-show-sidebar.svg"
import { SideNavContainer, BoardButton, SideNavTop, SideNavBottom, SidebarTag } from './SideNavElements';
import { toggleTheme } from '../../../app/preferencesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentBoard } from '../../../app/boardsSlice';
import Modal from '../../modals/Modal';
import CreateBoard from "../../modals/CreateBoard"
import { createPortal } from 'react-dom';
import styled from 'styled-components';
const ModalOverlay = styled.section`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`

function getBoardsButtons(boardsData, onClick){
  
  const buttons = boardsData.boards?.map((board) => (
    <BoardButton 
      key={board.id}
      className={board.id=== boardsData.currentBoardId ? "active" : ""}
      onClick={(e) => onClick(e)}
      data-id={board.id}
    >
      {board.name}
    </BoardButton>
  ))
  return buttons
}

function SideNav({isSidebar, toggleSidebar, toggleCreateBoard, toggleState}) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  window.addEventListener("resize", handleWindowResize)
  
  function handleWindowResize(){
    setWindowWidth(window.innerWidth)
  }

  const colorTheme = useSelector((state) => state.preferences.theme)
  const boardsData = useSelector((state) => state.boards)
  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const dispatch = useDispatch()

  function handleThemeToggle(){
    dispatch(toggleTheme())
  }
  function handleSetCurrentBoard(e){
    dispatch(setCurrentBoard(e.target.dataset.id))
    toggleState && toggleState()
  }
  function handleClickCreateBoard(){
    setCreateModalOpen(prev => !prev)
  }

  const boardsButtons = getBoardsButtons(boardsData, handleSetCurrentBoard)

  if(windowWidth < 760){
    return createPortal(
      <ModalOverlay onClick={toggleState}>
        <SideNavContainer onClick={(e) => e.stopPropagation()}>
          <SideNavTop>
            <h2>ALL BOARDS ({boardsData.boards.length}) </h2>
            {boardsButtons &&
              <div className='boardsContainer'>
                {boardsButtons}
              </div>
            }
            <button className='newBoard' onClick={handleClickCreateBoard}>+ Create New Board</button>
          </SideNavTop>
          <SideNavBottom>
            <div className='themeToggle'>
              <img src={iconMoon} />
              <button data-theme={colorTheme} onClick={handleThemeToggle}>
                <span className='ball' />
              </button>
              <img src={iconSun} />
            </div>
          </SideNavBottom>
        </SideNavContainer>
        {createModalOpen && 
          <CreateBoard toggleState={handleClickCreateBoard} />

        }

      </ModalOverlay>,
      document.querySelector(".App")
    )
  }
  return (
    <>
    <SideNavContainer className={!isSidebar && "hide"} >
      <SideNavTop>
        <h2>ALL BOARDS ({boardsData.boards.length}) </h2>
        {boardsButtons &&
          <div className='boardsContainer'>
            {boardsButtons}
          </div>
        }
        <button className='newBoard' onClick={handleClickCreateBoard}>+ Create New Board</button>
      </SideNavTop>
      <SideNavBottom>
        <div className='themeToggle'>
          <img src={iconMoon} />
          <button data-theme={colorTheme} onClick={handleThemeToggle}>
            <span className='ball' />
          </button>
          <img src={iconSun} />
        </div>
        <button 
          className='hideSide' 
          onClick={toggleSidebar}
        >
          <img src={iconHide} /> 
          Hide Sidebar
        </button>
      </SideNavBottom>
      {
        !isSidebar &&  
        <SidebarTag onClick={toggleSidebar}>
          <img src={iconShow} />
        </SidebarTag>
      }
    </SideNavContainer>
    {createModalOpen && 
    <CreateBoard toggleState={handleClickCreateBoard} />
    
    }
    </>
   
  )
}

export default SideNav