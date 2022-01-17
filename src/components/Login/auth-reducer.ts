import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer';
import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from '../../api/todolist-api';
import { handleServerAppError } from '../../utils/errorUtils/handleServerAppError';
import { handleServerNetworkError } from '../../utils/errorUtils/handleServerNetworkError';
import { ClearTodoDataType, clearTodolistsAC } from '../Todolists/todolists-reducer';

type LoginStateType = {
  isLoggedIn: boolean
}
type ActionType =  ReturnType<typeof setIsLoggedInAC>
type ThunkDispatch = Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType | ClearTodoDataType>
const initialState: LoginStateType = {
  isLoggedIn: false
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const logoutTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout().then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(clearTodolistsAC())
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const authReducer = (state: LoginStateType = initialState, action: ActionType): LoginStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}