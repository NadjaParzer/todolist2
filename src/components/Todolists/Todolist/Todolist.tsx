import React, {useCallback, useEffect } from 'react';
import { AddItemForm } from '../../common/AddItemForm';
import {Task} from './Tasks/Task'
import { Editablespan } from '../../common/Editablespan';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../../app/store';
import { addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC } from '../tasks-reducer';
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer';
import { TaskType } from '../../../api/todolist-api';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Button, List } from '@mui/material';

type PropsType = {
  todolist: TodolistDomainType
  changeFilter: (value: FilterValuesType, todolistID: string) => void
  removeTodolist: (todolistID: string) => void
  changeTodolistTitle: (title: string, todolistID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
  console.log('TODOLIST is called!', props.todolist.id)
  const dispatch = useDispatch()
  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.todolist.id])

  // useEffect(() => {
  //   if(demo) {
  //     return
  //   }
  //   dispatch(fetchTasksTC(props.todolist.id))
  // }, [])

  const removeTask = useCallback((taskId: string) => {
   //dispatch(removeTaskTC(props.todolist.id, id))
   dispatch(removeTaskTC({id: props.todolist.id, taskId}))
  }, [dispatch, props.todolist.id])

  const onChangeHandler = useCallback((taskId, status ) => {
    dispatch(updateTaskTC({taskId,domainModel: {status}, id: props.todolist.id}))
  }, [dispatch, props.todolist.id])

  const onChangeTitle = useCallback((taskId, title) => {
    dispatch(updateTaskTC({taskId, domainModel: {title}, id:props.todolist.id}))
  },[dispatch, props.todolist.id])

  const addTask = useCallback((title: string) => {
    const action = addTaskTC ({id: props.todolist.id, title})
    dispatch(action)
  }, [dispatch,  props.todolist.id])

  const onAllClickHandle = useCallback(() => {
    props.changeFilter('all', props.todolist.id)
  }, [props.changeFilter, props.todolist.id])
  const onActiveClickHandle = useCallback(() => {
    props.changeFilter('active', props.todolist.id)
  }, [props.changeFilter, props.todolist.id])
  const onCompletedClickHandle = useCallback(() => {
    props.changeFilter('completed', props.todolist.id)
  }, [props.changeFilter, props.todolist.id])
  // const removeTodolist = () => {
  //   props.removeTodolist(props.todolistID)
  // }
  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(title, props.todolist.id)
  }, [props.changeTodolistTitle, props.todolist.id])

  let tasksForTodolist = tasks
  if (props.todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === 2)
  } else if (props.todolist.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === 0)
  }

  return (
    <div>
      <h3>
        <Editablespan title={props.todolist.title} onChange={changeTodolistTitle} disabled={props.todolist.entityStatus === 'loading'} />
        <IconButton onClick={() => props.removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus === 'loading'} >
          <Delete />
        </IconButton></h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <List>
        {
          tasksForTodolist.map((t) => <Task disabled={props.todolist.entityStatus === 'loading'} task={t} todolistID={props.todolist.id}
            changeTaskTitle={onChangeTitle}
            key={t.id}
            removeTask={removeTask} changeTaskStatus={onChangeHandler} />)
        }
      </List>
      <div>
        <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandle}>All</Button>
        <Button color='primary' variant={props.todolist.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandle}>Active</Button>
        <Button color='secondary' variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandle}>Completed</Button>
      </div>
    </div>
  )
})

