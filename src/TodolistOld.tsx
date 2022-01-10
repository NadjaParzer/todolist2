import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { Editablespan } from './Editablespan';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { TaskStatuses, TaskType } from './api/todolist-api';
import { FilterValuesType } from './state/todolists-reducer';

type PropsType = {
  tasks: Array<TaskType >
  todolistID: string,
  title: string,
  changeFilter: (value: FilterValuesType, todolistID: string) => void,
  filter: FilterValuesType,
  removeTodolist: (todolistID: string) => void,
  changeTodolistTitle: (title: string, todolistID: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistID: string) => void
  removeTask: (id: string, todolistID: string) => void
  addTask: (title: string, todolistID: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses , todolistID: string ) => void

}

export function TodolistOld(props: PropsType) {

  function removeTask(id: string) {
    props.removeTask(id, props.todolistID)
  }
  function addTask(title: string) {
    props.addTask(title, props.todolistID)
  }

  const onAllClickHandle = () => {
    props.changeFilter('all', props.todolistID)
  }
  const onActiveClickHandle = () => {
    props.changeFilter('active', props.todolistID)
  }
  const onCompletedClickHandle = () => {
    props.changeFilter('completed', props.todolistID)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.todolistID)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(title, props.todolistID)
  }

  return (
    <div>
      <h3>
        <Editablespan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton></h3>
      <AddItemForm addItem={addTask} />
      <List>
        {
          props.tasks.map((t) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              let status
              e.currentTarget.checked ? status = 2 : status = 0
              props.changeTaskStatus(t.id, status, props.todolistID)
            }
            const onChangeTaskTitle = (title: string) => {
              props.changeTaskTitle(t.id, title, props.todolistID)
            }
            return <ListItem className={t.status === 2 ? 'is-done' : ''} key={t.id}><Checkbox onChange={onChangeHandler} checked={t.status === 2} />
              <Editablespan onChange={onChangeTaskTitle} title={t.title} />
              <IconButton onClick={() => removeTask(t.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem >
          })
        }
      </List>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandle}>All</Button>
        <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandle}>Active</Button>
        <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandle}>Completed</Button>
      </div>
    </div>
  )
}
