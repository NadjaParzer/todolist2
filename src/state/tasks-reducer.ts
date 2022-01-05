import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, todolistID1, todolistID2 } from './todolists-reducer';
import { TasksStateType } from './../App';
import {v1} from 'uuid';
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api';

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
  status: number
}
export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType 
                   | ChangeTaskTitleActionType | ChangeTaskStatusActionType 
                   | AddTodolistActionType | RemoveTodolistActionType 
                   | SetTodolistsActionType | SetTasksActionType

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK',taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', title, taskId, todolistId }
}
export const changeTaskStatusAC = ( taskId: string, status: number, todolistId: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, status }
}

const initialState:TasksStateType = {
  [todolistID1]: [{ id: v1(), title: 'CSS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
  { id: v1(), title: 'JS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
  { id: v1(), title: 'React', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
  { id: v1(), title: 'Vui', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }],
  [todolistID2]: [
    { id: v1(), title: 'Milk', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
  { id: v1(), title: 'Bread', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
  ]
}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'SET-TODOLISTS': {
      let stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.todolistId] = []
      })
      return stateCopy
    }
    case 'SET-TASKS': {
      let stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    case 'REMOVE-TASK': {
     let stateCopy = {...state}
     const tasks = state[action.todolistId]
     const newTasks = tasks.filter( t => t.id !== action.taskId)
     stateCopy[action.todolistId] = newTasks
     return stateCopy
    }
    case 'ADD-TASK' : {
      let stateCopy = {...state}
      let newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }
      let tasks = stateCopy[action.todolistId]
      let newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId]
      state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t )
      return {...state}

      // let stateCopy = {...state}
      // let tasks = stateCopy[action.todolistId]
      // stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      // return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {...state}
      let tasks = stateCopy[action.todolistId]
      stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
      return stateCopy
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
    return state
    //throw new Error('Failed action type!')
  }
}