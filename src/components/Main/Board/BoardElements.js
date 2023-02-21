import styled from "styled-components";

export const BoardContainer = styled.section`
  width: calc(100vw - 18rem);
  height: calc(100vh - 6rem);
  background-color:${props => `${props.theme.bg}`} ;
  left: 18rem;
  padding: 1.5rem; 
  position: absolute;
  cursor: grab;
  transition: left .3s ease;
  overflow: hidden; 
  display:flex;
  gap: 1.5rem;
  flex-wrap: nowrap;
  flex-shrink: 0;

  &.all{
    width: 100vw;
    left: 0;
  }

  & > .new-column{
    width: 18rem;
    height: calc(100% - 2rem);
    margin-top: 2rem;
    color: ${props => props.theme.subTitle};
    font-weight: 700;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom,rgba(121,132,147,.2),rgba(130,143,163,.1),rgba(130,143,163,0)); 
    transition: color 0.25s ease;
    font-size: 1.4rem;
    cursor: pointer;
    &:hover{
      color: ${props => props.theme.darkBlue}
    }
  }

  @media (width < 760px){
    width: 100vw;
    left: 0;
  }
`

export const ColumnContainer = styled.section`
  /* position: relative; */
  width: 16rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 16rem;

  & > span {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:before{
      content: "";
      height: 0.7rem;
      width: 0.7rem;
      border-radius: 50%;
      background-color: ${props => props.ballColor};
    
      position: relative;
      /* left: 0;
      top: 0; */
    }
  }

  & > span > h1{
    color: ${props => props.theme.subTitle};
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.1rem; 

  }
`

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;  
  border-radius: 5px;
  height: 100%;

  &.empty{
    border: dashed 2px  ${props => props.theme.subTitle};
    opacity: 0.6;
  }
`

export const TaskItem = styled.div`
  color: ${props => props.theme.title};
  background-color: ${props => props.theme.main};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 4px #364e7e1a;
  transition: opacity .25s ease;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  cursor: grab;

  h2{
    font-size: 0.8rem;
  }
  p{
    font-size: 0.8rem;
    color: ${props => props.theme.subTitle};
    font-weight: 600;
  }
  &:hover{
    opacity: 0.6;
  }
`