import { addTodolistAC, AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TaskType } from './../Todolist';
import { TasksStateType } from './../App';
import { FilterValuesType, TodolistType } from "../App"
import {v1} from 'uuid';
import { act } from 'react-dom/test-utils';

// type ActionType = {
//   type: string,
//   [key: string]: any
// }

type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string,
  taskId: string
}
type AddTaskActionType = {
  type: 'ADD-TASK',
  title: string,
  todolistId: string
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  taskId: string,
  title: string
  todolistId: string
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string,
  taskId: string
  status: boolean
}

type ActionsType = RemoveTaskActionType | AddTaskActionType 
                   | ChangeTaskTitleActionType | ChangeTaskStatusActionType 
                   | AddTodolistActionType | RemoveTodolistActionType

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK',taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', title, taskId, todolistId }
}
export const changeTaskStatusAC = ( taskId: string, status: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, status }
}


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK': {
     let stateCopy = {...state}
     const tasks = state[action.todolistId]
     const newTasks = tasks.filter( t => t.id != action.taskId)
     stateCopy[action.todolistId] = newTasks
     return stateCopy
    }
    case 'ADD-TASK' : {
      let stateCopy = {...state}
      let newTask: TaskType = {id: v1(), title: action.title, isDone: false }
      let tasks = stateCopy[action.todolistId]
      let newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      let stateCopy = {...state}
      let tasks = stateCopy[action.todolistId]
      let task = tasks.find(t => t.id === action.taskId)
      if (task) {
        task.title = action.title
      }
      //stateCopy[action.todolistId] = tasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      // let stateCopy = {...state}
      // let tasks =  stateCopy[action.todolistId]
      // let task = tasks.find( t => t.id === action.taskId)
      // if (task)  {
      //   task.isDone = action.status
      // } 
      // stateCopy
      // return stateCopy[action.todolistId] = tasks

      let tasksNew = state[action.todolistId]
      let task = tasksNew.find(t => t.id === action.taskId)
      if (task) {
        task.isDone = action.status
      }
      return { ...state }
    }
    case 'ADD-TODOLIST': {
      let stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      let stateCopy = {...state}
      delete stateCopy[action.id] 
      return stateCopy
    }
    default: 
    throw new Error('Failed action type!')
  }
}