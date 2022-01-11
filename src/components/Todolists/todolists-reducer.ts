import { Dispatch } from 'redux';
import {v1} from 'uuid';
import { todolistAPI, TodolistType } from "../../api/todolist-api";
import { RequestStatusType, setStatusAC, SetStatusActionType } from '../../app/app-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {filter: FilterValuesType} & {entityStatus: RequestStatusType }
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ActionsType = RemoveTodolistActionType | AddTodolistActionType 
                   | SetTodolistsActionType
                   | ReturnType<typeof changeTodolistTitleAC>
                   | ReturnType<typeof changeTodolistFilterAC>
type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType>                  
// action
export const removeTodolistAC = (id: string) =>
  ({ type: 'REMOVE-TODOLIST', id } as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (title: string, id: string) =>
  ({ type: 'CHANGE-TODOLIST-TITLE', title, id } as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
  ({ type: 'CHANGE-TODOLIST-FILTER', filter, id } as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: 'SET-TODOLISTS', todolists } as const)
  

// thunks
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
    .then((res) => {
    dispatch(setTodolistsAC(res.data))
    dispatch(setStatusAC('succeeded'))
  })
  }
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(id).then((res) => {
      dispatch(removeTodolistAC(id))
    })
  }
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
  dispatch(setStatusAC('loading'))
    todolistAPI.createTodolists(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item))
      dispatch(setStatusAC('succeeded'))
    })
  }
export const changeTodolistTitleTC = (title: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(id, title).then(
      res => {
        dispatch(changeTodolistTitleAC(title, id))
      }
    )
  }

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState:Array<TodolistDomainType> = [
  // { todolistId: todolistID1, title: 'What to learn', filter: 'all', order:0, addedDate:'' },
  // { todolistId: todolistID2, title: 'What to buy', filter: 'all', order:0, addedDate:'' },
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch(action.type) {
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle' }))
    case 'REMOVE-TODOLIST': 
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST' : 
      return [ {...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state ]
    case 'CHANGE-TODOLIST-TITLE': 
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER': 
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    default: 
    return state
    // throw new Error('Failed action type!')
  }
}