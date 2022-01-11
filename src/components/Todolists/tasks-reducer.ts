import { AppRootState } from '../../app/store';
import { UpdateTaskModelType } from '../../api/todolist-api';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, todolistID1, todolistID2 } from './todolists-reducer';
import {v1} from 'uuid';
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI } from '../../api/todolist-api';
import { Dispatch } from 'redux';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

// type ActionType = {
//   type: string,
//   [key: string]: any
// }
// types
type ActionsType = ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
// actions
export const removeTaskAC = (taskId: string, id: string) => ({ type: 'REMOVE-TASK',taskId, id} as const)
export const addTaskAC = ( task: TaskType) => ({ type: 'ADD-TASK', task} as const)
export const changeTaskTitleAC = (taskId: string, title: string, id: string) => ({ type: 'CHANGE-TASK-TITLE', title, taskId, id } as const)
export const updateTaskAC = ( taskId: string, model: UpdateDomainTaskModelType, id: string) => ({ type: 'UPDATE-TASK', id, taskId, model } as const)
export const setTasksAC = (id: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', id, tasks} as const)

// thunks
export const fetchTasksTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(id)
      .then(res => {
        //console.log('IDTODOLIST', todolistId)
        dispatch(setTasksAC(id, res.data.items))
      })
  }
export const removeTaskTC = (id: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(id, taskId)
      .then(res => {
        const action = removeTaskAC(taskId, id)
        dispatch(action)
      })
  }
export const addTaskTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(id, title)
    .then( res => {
      let task = res.data.data.item
      dispatch(addTaskAC(task))
    })
  }
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, id: string) => 
  (dispatch: Dispatch<ActionsType>, getState: ()=>  AppRootState) => {
    const state = getState()
    let task = state.tasks[id].find(t => t.id === taskId)
    if (!task) {
      //throw new Error('task is not found')
      console.warn('task is not found in the state!')
      return
    }
    const apiModel: UpdateTaskModelType = {
      completed: task.completed,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      title: task.title,
      ...domainModel
    }
    todolistAPI.updateTask(id, taskId, apiModel).then(
      res => {
        dispatch(updateTaskAC(taskId, domainModel, id))
      }
    )
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
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'SET-TASKS':
      return {...state, [action.id]: action.tasks}
      // let stateCopy = {...state}
      // stateCopy[action.id] = action.tasks
      // return stateCopy
    case 'REMOVE-TASK': 
      return { ...state, [action.id]: state[action.id].filter( t => t.id !== action.taskId)}
    //  let stateCopy = {...state}
    //  const tasks = state[action.id]
    //  const newTasks = tasks.filter( t => t.id !== action.taskId)
    //  stateCopy[action.id] = newTasks
    //  return stateCopy
    case 'ADD-TASK' : 
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
      // let stateCopy = {...state}
      // let newTask = action.task
      // let tasks = stateCopy[action.task.todoListId]
      // let newTasks = [newTask, ...tasks]
      // stateCopy[action.task.todoListId] = newTasks
      // return stateCopy
    case 'CHANGE-TASK-TITLE': 
      return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
      // let todolistTasks = state[action.id]
      // state[action.id] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t )
      // return {...state}

      // let stateCopy = {...state}
      // let tasks = stateCopy[action.todolistId]
      // stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      // return stateCopy
    case 'UPDATE-TASK': 
      return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
      // const stateCopy = {...state}
      // let tasks = stateCopy[action.id]
      // stateCopy[action.id] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
      // return stateCopy
    case 'ADD-TODOLIST': 
      return {...state, [action.todolist.id]: []}
      // let stateCopy = {...state}
      // stateCopy[action.todolist.id] = []
      // return stateCopy
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