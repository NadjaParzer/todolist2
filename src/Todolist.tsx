
import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { Editablespan } from './Editablespan';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  todolistID: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistID: string) => void,
  changeFilter: (value: FilterValuesType, todolistID: string) => void,
  addTask: (title: string, todolistID: string) => void,
  changeStatus: (id: string, isDone: boolean, todolistID: string) => void,
  filter: FilterValuesType,
  removeTodolist: (todolistID: string) => void,
  changeTaskTitle: (id: string, title: string, todolistID: string) => void,
  changeTodolistTitle: (title: string, todolistID: string) => void

}

export function Todolist (props: PropsType) {

  const removeTask = (id: string) => {
    props.removeTask(id, props.todolistID)
  }
  const onAllClickHandle = () => {
    props.changeFilter('all', props.todolistID)
  }
  const onActiveClickHandle = () => {
    props.changeFilter('active', props.todolistID)
  }
  const onCompletedClickHandle = () => {
    props.changeFilter('completed',  props.todolistID)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.todolistID)
  }
  const addItem = (title: string) => {
    props.addTask(title, props.todolistID)
  }
  const changeTodolistTitle = (title:string) => {
    props.changeTodolistTitle(title, props.todolistID)
  }
  return (
    <div>
      <h3>
        <Editablespan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton></h3>
      <AddItemForm addItem={addItem} />
      <List>
        {
          props.tasks.map((t) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.todolistID)
            }
            const onChangeTaskTitle = (title: string) => {
              props.changeTaskTitle(t.id, title, props.todolistID)
            }
            return <ListItem  className={t.isDone ? 'is-done' : ''} key={t.id}><Checkbox onChange={onChangeHandler} checked={t.isDone} />
            <Editablespan onChange={onChangeTaskTitle} title={t.title} />
            <IconButton onClick={() => removeTask(t.id)}>
            <DeleteIcon />
            </IconButton>
            </ListItem >
          })
        }
      </List>
      <div>
        <Button  variant={props.filter === 'all' ? 'contained' : 'text'} onClick = {onAllClickHandle}>All</Button>
        <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'} onClick = {onActiveClickHandle}>Active</Button>
        <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'} onClick = {onCompletedClickHandle}>Completed</Button>
      </div>
    </div>
  ) 
}
