import { FilterValuesType, TodolistType } from "../App"
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  title: string
  todolistId: string
}
type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType 
                   | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId }
}

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState:Array<TodolistType> = [
  { id: todolistID1, title: 'What to learn', filter: 'all' },
  { id: todolistID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
  switch(action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST' : {
      return [ {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      }, ...state ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const copyState = state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      return copyState
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const copyState = state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      return copyState
    }
    
    default: 
    return state
    // throw new Error('Failed action type!')
  }
}