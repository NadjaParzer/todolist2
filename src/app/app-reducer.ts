import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI } from "../api/todolist-api"
import { setIsLoggedInAC } from "../components/Login/auth-reducer"
import { handleServerNetworkError } from "../utils/errorUtils/handleServerNetworkError"

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    initialized: false
  } as AppInitialStateType,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    }
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state) => {
      state.initialized = true
    })
  }
})

// thunks
export const initializeAppTC = createAsyncThunk('app/init', async (_, { dispatch }) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }))
    } else {
    }
    return
  } catch (error: any) {
    handleServerNetworkError(error.message, dispatch)
  }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC } = slice.actions

export type AppInitialStateType = {
  status: RequestStatusType
  error: string | null
  //true if user is checked
  initialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// thunks
// export const initializeAppTC_ = () => (dispatch: Dispatch) => {
//   authAPI.me().then(res => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedInAC({ value: true }))
//     } else {
//     }
//     dispatch(setAppInitAC({ initialized: true }))
//   })
//     .catch(
//       (error) => {
//         handleServerNetworkError(error.message, dispatch)
//       }
//     )
// }

// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitAC>
// // actions
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
// export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
// export const setAppInitAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)


// export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
//   switch (action.type) {
//     case 'APP/SET-IS-INITIALIZED':
//       return {...state, initialized: action.value}
//     case 'APP/SET-STATUS':
//       return { ...state, status: action.status }
//     case 'APP/SET-ERROR':
//       return { ...state, error: action.error }

//     default:
//       return state
//   }
// }
