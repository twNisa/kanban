import styled from "styled-components";

export const SideNavContainer = styled.section`
  color: ${props => props.theme.subTitle};
  min-width: 18rem;
  border-right: 1px solid ${props => props.theme.borderLine};
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  background-color:${props => `${props.theme.main}`} ;
  transition: transform .3s ease;
  z-index: 10;
  position:relative;

  &.hide{
    transform: translateX(-100%);
  }
`

export const SideNavTop = styled.section`
  margin-top: 1rem;
  
  & button{
    background: none;
    border: none;
    color: ${props => props.theme.subTitle};
    font-weight: 600;
    padding: 0.8rem 0;
    cursor: pointer;
    transition: all 0.25s ease;
    padding-left: 2rem;
    /* padding-right: 4rem; */ 
  }

  & > button.newBoard{
    color: ${props => props.theme.darkBlue};
    transition: color 0.25s ease;
    &:hover{
      color: ${props => props.theme.lightBlue}
    }
  }
  h2{
    margin-left: 2rem;
    font-size: 0.7rem;
    cursor: default;
  }

  & .boardsContainer{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > button{
      margin-right: 1rem;
      border-start-end-radius: 2rem;
      border-end-end-radius: 2rem;
      text-align: left;
    }
    & > button:hover{
      background-color: ${props => props.theme.darkBlue};
      color: white;
      opacity: 0.6;
    }
    & > button.active,
    & > button.active:hover{
      background-color: ${props => props.theme.darkBlue};
      color: white;
      opacity: 1;
      
    }
  }
`

export const SideNavBottom = styled.section`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > div.themeToggle{
    background-color: ${props => props.theme.bg};
    width: 12rem;
    height: 2rem;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > button{
      background-color: ${props => props.theme.darkBlue};
      height: 1rem;
      width: 2.5rem;
      border: none;
      border-radius: 1rem;
      display: flex;
      margin: 0 1rem;
      position: relative;
      align-items: center;
      cursor: pointer;

      &:before{
        content: "";
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 50%;
        position: absolute;
        left: 4px;
        background-color: white;
        transition: all .25s ease;


      }

      
      &[data-theme="dark"]:before{
        left: 58%;
        
      }
    }
  }

  & > button.hideSide{
    background: none;
    border: none;
    display: flex;
    align-items: center;
    /* padding: 0.6rem 0; */
    margin-top: 1rem;
    font-weight: 600;
    gap: 0.6rem;
    cursor: pointer;
    transition: all  0.25s ease;
    color: ${props => props.theme.subTitle};
    &:hover{
      opacity: 0.6;
    }
  }

`

export const BoardButton = styled.button`
  position: relative;

  &:before{
    position: absolute;
    content: url("../../../assets/icon-board.svg");
    height: 2rem;
    width: 2rem;

  }

`

export const SidebarTag = styled.button`

  position: absolute;
  right: 0;
  bottom: 1.5rem;
  border: 0;
  height: 3rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-start-end-radius: 2rem;
  border-end-end-radius: 2rem;
  transform: translateX(100%);
  background-color: ${props => props.theme.darkBlue};
  cursor: pointer;


`

