

import { Dispatch } from 'redux';
import {v1} from 'uuid';
import { todolistAPI, TodolistType } from "../api/todolist-api";

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export type SetTodolistsActionType = {
  type: 'SET-TODOLISTS',
  todolists: Array<TodolistType>
}
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  todolist: TodolistType
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
                   | SetTodolistsActionType

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId }
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
  return { type: 'SET-TODOLISTS', todolists}
}
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
    .then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId))
    })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTodolists(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item))
    })
  }
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title).then(
      res => {
        dispatch(changeTodolistTitleAC(title, todolistId))
      }
    )
  }
}

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState:Array<TodolistDomainType> = [
  // { todolistId: todolistID1, title: 'What to learn', filter: 'all', order:0, addedDate:'' },
  // { todolistId: todolistID2, title: 'What to buy', filter: 'all', order:0, addedDate:'' },
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch(action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: 'all'
        }
      })
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST' : {
      const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
      return [ newTodolist, ...state ]
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