
import React from 'react';
import {action} from '@storybook/addon-actions'
import { Task } from './Task';


export default {
  title: 'Task Component',
  component: Task
}

const callbackRemove = action('Task is removed')
const callbackChangeStatus = action('Status is changed')
const callbackChangeTitle = action('Title is changed')

export const TaskBaseExample = () => {
  return <>
    <Task task={{ id: '1', isDone: true, title: 'CSS' }} todolistID='todolistId1' 
          changeTaskStatus={callbackChangeStatus} changeTaskTitle={callbackChangeTitle} removeTask={callbackRemove} />
    <Task task={{ id: '2', isDone: false, title: 'JS' }} todolistID='todolistId1' 
          changeTaskStatus={callbackChangeStatus} changeTaskTitle={callbackChangeTitle} removeTask={callbackRemove} />
  </>

}