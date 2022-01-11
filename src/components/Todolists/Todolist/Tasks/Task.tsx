import React, { ChangeEvent} from 'react';
import { Editablespan } from '../../../common/Editablespan';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { TaskType } from '../../../../api/todolist-api';


type TaskPropsType = {
  task: TaskType
  todolistID: string
  removeTask: (id: string) => void
  changeTaskStatus: (taskId: string, status: number) => void
  changeTaskTitle: (taskId: string, title: string) => void
  
  }
  
  export const Task = React.memo((props: TaskPropsType) => {
    console.log('TASK is called')

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      let status
      e.currentTarget.checked ? status = 2 : status = 0
      props.changeTaskStatus(props.task.id, status)
    }

    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(props.task.id, title)
    }

    return <ListItem className={props.task.status === 2 ? 'is-done' : ''} key={props.task.id}>
      <Checkbox onChange={changeTaskStatus} checked={props.task.status === 2} />
      <Editablespan onChange={changeTaskTitle} title={props.task.title} />
      <IconButton onClick={() => props.removeTask(props.task.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem >
  })