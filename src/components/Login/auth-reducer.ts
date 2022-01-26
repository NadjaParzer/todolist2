import { FieldErrorType } from './../../api/todolist-api';

import { setAppStatusAC } from '../../app/app-reducer';
import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from '../../api/todolist-api';
import { handleServerAppError } from '../../utils/errorUtils/handleServerAppError';
import { handleServerNetworkError } from '../../utils/errorUtils/handleServerNetworkError';
import { clearTodolistsAC } from '../Todolists/todolists-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';


// thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType, { //{ isLoggedIn: boolean } if this param come
  rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (data, ThunkAPI) => {
  ThunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      ThunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
      //return { isLoggedIn: true }
      return
    } else {
      handleServerAppError(res.data, ThunkAPI.dispatch)
      return ThunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (err: any) {
    // const error: AxiosError = err
    handleServerNetworkError(err, ThunkAPI.dispatch)
    return ThunkAPI.rejectWithValue({ errors: [err.message], fieldsErrors: undefined })
  }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_, ThunkAPI) => {
  ThunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      ThunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
      ThunkAPI.dispatch(clearTodolistsAC({}))
      return
    } else {
      handleServerAppError(res.data, ThunkAPI.dispatch)
      return ThunkAPI.rejectWithValue({})
    }
  }
  catch (error: any) {
    handleServerNetworkError(error, ThunkAPI.dispatch)
    return ThunkAPI.rejectWithValue({})
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    }
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state) => {
        state.isLoggedIn = true
    })
    builder.addCase(logoutTC.fulfilled, (state) => {
      state.isLoggedIn = false
  })
  }
})

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const authReducer = slice.reducer

//// thunks
export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch) => {
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
export const logoutTC_ = () => (dispatch: Dispatch) => {
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
