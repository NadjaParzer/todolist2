
import React from 'react';
import {action} from '@storybook/addon-actions'
import { Task } from './Task';
import { TaskPriorities, TaskStatuses } from './api/todolist-api';


export default {
  title: 'Task Component',
  component: Task
}

const callbackRemove = action('Task is removed')
const callbackChangeStatus = action('Status is changed')
const callbackChangeTitle = action('Title is changed')

export const TaskBaseExample = () => {
  return <>
    <Task task={{ id: '1', status: TaskStatuses.New, title: 'CSS', todoListId: 'todolistId1', completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }} todolistID='todolistId1' 
          changeTaskStatus={callbackChangeStatus} changeTaskTitle={callbackChangeTitle} removeTask={callbackRemove} />
    <Task task={{ id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1', completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  }} todolistID='todolistId1' 
          changeTaskStatus={callbackChangeStatus} changeTaskTitle={callbackChangeTitle} removeTask={callbackRemove} />
  </>

}