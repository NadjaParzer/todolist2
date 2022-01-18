
import { setAppStatusAC } from '../../app/app-reducer';
import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from '../../api/todolist-api';
import { handleServerAppError } from '../../utils/errorUtils/handleServerAppError';
import { handleServerNetworkError } from '../../utils/errorUtils/handleServerNetworkError';
import { clearTodolistsAC } from '../Todolists/todolists-reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
}
const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
       state.isLoggedIn = action.payload.value
    }
  }
})

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
//the same witgh destructurization:
//export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status :'loading'}))
  authAPI.login(data).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status :'loading'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status :'loading'}))
  authAPI.logout().then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: false}))
      dispatch(setAppStatusAC({status :'loading'}))
      dispatch(clearTodolistsAC({}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const authReducer = slice.reducer

////////////////////////////////////////
/////// without toolkit
//////////////////

// type LoginStateType = {
//   isLoggedIn: boolean
// }
// type ActionType =  ReturnType<typeof setIsLoggedInAC>
// type ThunkDispatch = Dispatch<ActionType | SetAppErrorActionType 
//                      | SetAppStatusActionType | ClearTodoDataType>

// const initialState: LoginStateType = {
//   isLoggedIn: false
// }
// type LoginStateType = {
//   isLoggedIn: boolean
// }
// type ActionType =  ReturnType<typeof setIsLoggedInAC>
// type ThunkDispatch = Dispatch<ActionType | SetAppErrorActionType 
//                      | SetAppStatusActionType | ClearTodoDataType>

// const initialState: LoginStateType = {
//   isLoggedIn: false
// }

// export const authReducer = (state: LoginStateType = initialState, action: ActionType): LoginStateType => {
//   switch (action.type) {
//     case 'login/SET-IS-LOGGED-IN':
//       return {...state, isLoggedIn: action.value}
//     default:
//       return state
//   }
// }