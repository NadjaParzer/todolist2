import React, {useCallback, useEffect } from 'react';
import { AddItemForm } from '../../common/AddItemForm';
import {Task} from './Tasks/Task'
import { Editablespan } from '../../common/Editablespan';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../../app/store';
import { fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC } from '../tasks-reducer';
import { FilterValuesType } from '../todolists-reducer';
import { TaskType } from '../../../api/todolist-api';

type PropsType = {
  todolistID: string,
  title: string,
  changeFilter: (value: FilterValuesType, todolistID: string) => void,
  filter: FilterValuesType,
  removeTodolist: (todolistID: string) => void,
  changeTodolistTitle: (title: string, todolistID: string) => void

}

export const Todolist = React.memo((props: PropsType) => {
  console.log('TODOLIST is called!', props.todolistID)
  const dispatch = useDispatch()
  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.todolistID])

  useEffect(() => {
    console.log('TODOLISTID', props.todolistID)
    dispatch(fetchTasksTC(props.todolistID))
  }, [])

  const removeTask = useCallback((id: string) => {
   dispatch(removeTaskTC(props.todolistID, id))
  }, [dispatch, props.todolistID])

  const onChangeHandler = useCallback((taskId, status ) => {
    dispatch(updateTaskTC(taskId, {status}, props.todolistID))
  }, [dispatch, props.todolistID])

  const onChangeTitle = useCallback((taskId, title) => {
    dispatch(updateTaskTC(taskId, {title}, props.todolistID))
  },[dispatch, props.todolistID])

  const addTask = useCallback((title: string) => {
    const action = addTaskTC(props.todolistID, title)
    dispatch(action)
  }, [dispatch,  props.todolistID])

  const onAllClickHandle = useCallback(() => {
    props.changeFilter('all', props.todolistID)
  }, [props.changeFilter, props.todolistID])
  const onActiveClickHandle = useCallback(() => {
    props.changeFilter('active', props.todolistID)
  }, [props.changeFilter, props.todolistID])
  const onCompletedClickHandle = useCallback(() => {
    props.changeFilter('completed', props.todolistID)
  }, [props.changeFilter, props.todolistID])
  // const removeTodolist = () => {
  //   props.removeTodolist(props.todolistID)
  // }
  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(title, props.todolistID)
  }, [props.changeTodolistTitle, props.todolistID])

  let tasksForTodolist = tasks
  if (props.filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === 2)
  } else if (props.filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === 0)
  }

  return (
    <div>
      <h3>
        <Editablespan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={() => props.removeTodolist(props.todolistID)}>
          <DeleteIcon />
        </IconButton></h3>
      <AddItemForm addItem={addTask} />
      <List>
        {
          tasksForTodolist.map((t) => <Task task={t} todolistID={props.todolistID}
            changeTaskTitle={onChangeTitle}
            key={t.id}
            removeTask={removeTask} changeTaskStatus={onChangeHandler} />)
        }
      </List>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandle}>All</Button>
        <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandle}>Active</Button>
        <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandle}>Completed</Button>
      </div>
    </div>
  )
})

