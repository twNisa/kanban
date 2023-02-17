import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.theme.darkBlue};
  color: ${props => props.theme.white};
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color .25s ease;
  &:hover{
    background-color: ${props => props.theme.lightBlue};
  }
`