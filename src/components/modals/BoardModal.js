import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'

const BoardContainer = styled.section`

`
function BoardModal({toggleState, children}) {

  return (
    <Modal toggleState={toggleState} >
      <BoardContainer>
        {children}
      </BoardContainer>
    </Modal>
  )
}

export default BoardModal