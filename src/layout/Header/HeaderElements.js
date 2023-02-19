import styled from 'styled-components';


export const HeaderContainer = styled.header`
  /* padding: 1rem; */
  display: flex;
  background-color:${props => `${props.theme.main}`} ;

  & > picture {
    display: flex;
    align-items: center;
    height: 6rem;
    padding-left: 2rem;
    position: relative;
    
    @media (width > 760px){
      border-right: 1px solid ${props => `${props.theme.borderLine}`};
      min-width: 18rem;

      &:after{
      content:"";
      height: 1px;
      width: 100%;
      background-color: ${props => `${props.theme.borderLine}`};
      position: absolute;
      bottom: 0;
      left: 0;
    }
    }
    

  }

`

export const BoardHeading = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 1.5rem;
  color: ${props => `${props.theme.title}`};
  &:after{
      content:"";
      height: 1px;
      width: 100%;
      background-color: ${props => `${props.theme.borderLine}`};
      position: absolute;
      bottom: 0;
      left: 0;
    }

  & > .buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    @media (width < 760px){
      span{
        display: none;
      }
    }
  }
`