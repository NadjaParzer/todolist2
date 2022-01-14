import { Dispatch } from "redux"
import { authAPI } from "../api/todolist-api"
import { setIsLoggedInAC } from "../components/Login/auth-reducer"
import { handleServerNetworkError } from "../utils/errorUtils/handleServerNetworkError"

export type AppInitialStateType = {
  status: RequestStatusType
  error: string | null
  //true if user is checked
  initialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  initialized: false
}
// actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppInitAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {

    }
    dispatch(setAppInitAC(true))
  })
  .catch(
    (error) => {
      handleServerNetworkError(error.message, dispatch)
    }
  )
}

export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET-IS-INITIALIZED':
      return {...state, initialized: action.value}
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }

    default:
      return state
  }
}
