import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import {v1} from 'uuid';
import { todolistAPI, TodolistType } from "../../api/todolist-api";
import { RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer';
import { handleServerNetworkError } from '../../utils/errorUtils/handleServerNetworkError';
import { fetchTasksTC } from './tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {filter: FilterValuesType} & {entityStatus: RequestStatusType }
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ClearTodoDataType = ReturnType<typeof clearTodolistsAC>
// type ActionsType = RemoveTodolistActionType | AddTodolistActionType 
//                    | SetTodolistsActionType
//                    | ReturnType<typeof changeTodolistTitleAC>
//                    | ReturnType<typeof changeTodolistFilterAC>
//                    | ReturnType<typeof changeTodolistEntityStatus>
//                    | SetTaskType
//                    | ClearTodoDataType
// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>    


export let todolistID1 = v1()
export let todolistID2 = v1()
const initialState:Array<TodolistDomainType> = [
  // { todolistId: todolistID1, title: 'What to learn', filter: 'all', order:0, addedDate:'' },
  // { todolistId: todolistID2, title: 'What to buy', filter: 'all', order:0, addedDate:'' },
]

const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      //state.filter(tl => tl.id !== action.payload.id) - so also possible, but version with mutation is better for immer js
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ title: string, id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].filter = action.payload.filter
      }
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ status: RequestStatusType, id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    clearTodolistsAC(state, action: PayloadAction<{}>) {
      return []
    },
  }
})

export const todolistsReducer = slice.reducer
export const { removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
               changeTodolistFilterAC, setTodolistsAC, changeTodolistEntityStatus, 
               clearTodolistsAC} = slice.actions

// thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistAPI.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC({todolists: res.data}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
      return res.data
    })
    .then(todos => {
      todos.forEach((todo) => {
        dispatch(fetchTasksTC(todo.id))
      })
    })
    .catch(error => {
      handleServerNetworkError(error.message, dispatch)
    })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatus({status: 'loading', id: id}))
  todolistAPI.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC({id}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
  })
  .catch(error => {
    handleServerNetworkError(error.message, dispatch)
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodolists(title).then((res) => {
      dispatch(addTodolistAC({todolist: res.data.data.item}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    })
    .catch(error => {
      handleServerNetworkError(error.message, dispatch)
    })
  }
export const changeTodolistTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title).then(
      res => {
        dispatch(changeTodolistTitleAC({title, id}))
      }
    )
    .catch(error => {
      handleServerNetworkError(error.message, dispatch)
    })
  }

// // action
// export const removeTodolistAC = (id: string) =>
//   ({ type: 'REMOVE-TODOLIST', id } as const)
// export const addTodolistAC = (todolist: TodolistType) =>
//   ({ type: 'ADD-TODOLIST', todolist } as const)
// export const changeTodolistTitleAC = (title: string, id: string) =>
//   ({ type: 'CHANGE-TODOLIST-TITLE', title, id } as const)
// export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
//   ({ type: 'CHANGE-TODOLIST-FILTER', filter, id } as const)
// export const setTodolistsAC = (todolists: Array<TodolistType>) =>
//   ({ type: 'SET-TODOLISTS', todolists } as const)
// export const changeTodolistEntityStatus = (status: RequestStatusType, id: string) =>
// ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, id } as const)
// export const clearTodolistsAC = () =>
// ({ type: 'CLEAR-TODOLISTS'} as const)

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//   switch(action.type) {
//     case 'SET-TODOLISTS':
//       return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle' }))
//     case 'REMOVE-TODOLIST': 
//       return state.filter(tl => tl.id !== action.id)
//     case 'ADD-TODOLIST' : 
//       return [ {...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state ]
//     case 'CHANGE-TODOLIST-TITLE': 
//       return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//     case 'CHANGE-TODOLIST-FILTER': 
//       return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//     case 'CHANGE-TODOLIST-ENTITY-STATUS':
//       return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//     case 'CLEAR-TODOLISTS':
//       return []
//     default: 
//     return state
//     // throw new Error('Failed action type!')
//   }
// }