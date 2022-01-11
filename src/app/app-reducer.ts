export type AppInitialStateType = {
 status: RequestStatusType,
  error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = SetErrorActionType | SetStatusActionType
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
const initialState: AppInitialStateType = {
  status: 'idle',
  error: 'some error'
}
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const )
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const )


export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
  switch (action.type) {
      case 'APP/SET-STATUS':
          return {...state, status: action.status}
      case 'APP/SET-ERROR':
        return {...state, error: action.error}
      
      default:
          return state
  }
}

