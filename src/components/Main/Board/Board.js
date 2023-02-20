import React from 'react'
import { BoardContainer } from './BoardElements'
import {useDraggable} from "react-use-draggable-scroll"
import { useSelector, useDispatch } from 'react-redux'
import useCurrentData from '../../../hooks/useCurrentData'
import {ColumnContainer, TasksContainer, TaskItem} from "./BoardElements"
import Colors from '../../shared/Colors'
import ViewTask from '../../modals/ViewTask'
import AddColumn from '../../modals/AddColumn'


function getTasks(tasks_entries, handleViewTask, tasks){

  return tasks_entries.map(task => {
    return <TaskItem 
      key={tasks[task].id}
      onClick={() => handleViewTask(tasks[task])}
    >
      <h2>{tasks[task].name}</h2>
      <p>
        {!tasks[task].subtasks 
          ? tasks[task].desc
          : `${tasks[task].subtasks.filter(subtask => subtask.isCompleted === true).length}
            of 
            ${tasks[task].subtasks.length}
            subtasks`
        }
      </p>
    </TaskItem>
  })
}


function Board({isSidebar}) {
  const colorTheme = useSelector((state) => state.preferences.theme)
  const currentBoardId = useSelector(state => state.boards.currentBoardId)
  const boardsData = useSelector((state) => state.boards.boards).find(board => board.id === currentBoardId)
  const tasks = useSelector(state => state.boards.tasks)

  const [viewTaskState, setViewTaskState] = React.useState(false)
  const [editTaskState, setEditTaskState] = React.useState(false)
  const [targetTask, setTargetTask] = React.useState()
  const [addColumn, setAddColumn] = React.useState(false)
  
  function handleViewTask(task){
    setViewTaskState(prev => !prev)
    setTargetTask(task)
  }
  function handleAddColumn(){
    setAddColumn(prev => !prev)
  }
  

  const columns = boardsData?.columns?.map((column, index) => (
    <ColumnContainer 
      key={column.name} 
      ballColor={index > Colors.length-1  ? Colors.default : Colors[index]}
    >
      <span>
        <h1>{column.name.toUpperCase()} ({column.task_entries.length})</h1>
      </span>
      <TasksContainer className={!column.task_entries.length && "empty"}>
        {getTasks(column.task_entries, handleViewTask, tasks)}
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
    <>
      <BoardContainer className={!isSidebar ? "all" : ""} ref={ref} {...events}>
        {columns}
        <ColumnContainer className='new-column' onClick={()=>handleAddColumn()}>
          + New Column
        </ColumnContainer>
      </BoardContainer>   
      {
        viewTaskState && <ViewTask toggleState={handleViewTask} targetTask={targetTask} />
      }
      {
        addColumn && <AddColumn toggleState={handleAddColumn} />
      }
    </>
    
  )
}

export default Board