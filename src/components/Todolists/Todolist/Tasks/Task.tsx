import React, { ChangeEvent} from 'react';
import { Editablespan } from '../../../common/Editablespan';
import { TaskType } from '../../../../api/todolist-api';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { Delete } from '@mui/icons-material';


type TaskPropsType = {
  task: TaskType
  todolistID: string
  removeTask: (id: string) => void
  changeTaskStatus: (taskId: string, status: number) => void
  changeTaskTitle: (taskId: string, title: string) => void
  disabled?: boolean
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
      <Checkbox disabled={props.disabled || props.task.entityStatus === 'loading'} onChange={changeTaskStatus} checked={props.task.status === 2} />
      <Editablespan disabled={props.disabled || props.task.entityStatus === 'loading'} onChange={changeTaskTitle} title={props.task.title} />
      <IconButton disabled={props.disabled || props.task.entityStatus === 'loading'} onClick={() => props.removeTask(props.task.id)}>
        <Delete />
      </IconButton>
    </ListItem >
  })