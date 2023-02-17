import React from 'react'
import { BoardContainer } from './BoardElements'
import {useDraggable} from "react-use-draggable-scroll"
import { useSelector, useDispatch } from 'react-redux'
import useCurrentData from '../../../hooks/useCurrentData'
import {ColumnContainer, TasksContainer, TaskItem} from "./BoardElements"
import Colors from '../../shared/Colors'
import ViewTask from '../../modals/ViewTask'

function viewTask(){

}
function getTasks(tasks){
  return tasks.map(task => {
    const [viewTaskState, setViewTaskState] = React.useState(false)
    const handleViewTask = () => setViewTaskState(prev => !prev)

    return <TaskItem 
      key={task.id}
      onClick={viewTask(task, handleViewTask)}
    >
      <h2>{task.name}</h2>
      <p>
        {!task.subtasks 
          ? task.desc
          : `${task.subtasks.filter(subtask => subtask.isCompleted === true).length}
            of 
            ${task.subtasks.length}
            subtasks`
        }
      </p>
    </TaskItem>
  })
}



function Board({isSidebar}) {
  const colorTheme = useSelector((state) => state.preferences.theme)
  const boardsData = useCurrentData()

  const [viewTaskState, setViewTaskState] = React.useState(false)
  function handleViewTask(){setViewTaskState(prev => !prev)}

  const columns = boardsData?.columns?.map((column, index) => (
    <ColumnContainer 
      key={column.name} 
      ballColor={index > Colors.length-1  ? Colors.default : Colors[index]}
    >
      <span>
        <h1>{column.name.toUpperCase()} ({column.tasks.length})</h1>
      </span>
      <TasksContainer className={!column.tasks.length && "empty"}>
        {getTasks(column.tasks, handleViewTask)}
      </TasksContainer>
    </ColumnContainer>
  ))

  const dispatch = useDispatch()
  const ref = React.useRef()
  const {events} = useDraggable(ref)

  
  
  if(!boardsData){
    return <></>
  }
  return (
    <BoardContainer className={!isSidebar ? "all" : ""} ref={ref} {...events}>
      {columns}
      <ColumnContainer className='new-column'>
        + New Column
      </ColumnContainer>
    </BoardContainer>
  )
}

export default Board