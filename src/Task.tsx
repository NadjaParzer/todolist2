import React, { ChangeEvent, useCallback} from 'react';
import { Editablespan } from './Editablespan';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';


type TaskPropsType = {
  taskId: string
  todolistID: string
  isDone: boolean
  title: string
  removeTask: (id: string) => void
  }
  
  export const Task = React.memo((props: TaskPropsType) => {
    console.log('TASK is called')
    const dispatch = useDispatch()
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistID))
    }, [dispatch, props.todolistID, props.taskId])
    const onChangeTaskTitle = useCallback((title: string) => {
      dispatch(changeTaskTitleAC(props.taskId, title, props.todolistID))
    }, [dispatch, props.taskId, props.todolistID])
    return <ListItem className={props.isDone ? 'is-done' : ''} key={props.taskId}><Checkbox onChange={onChangeHandler} checked={props.isDone} />
      <Editablespan onChange={onChangeTaskTitle} title={props.title} />
      <IconButton onClick={() => props.removeTask(props.taskId)}>
        <DeleteIcon />
      </IconButton>
    </ListItem >
  })