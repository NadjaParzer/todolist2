import { SetAppErrorActionType, SetAppStatusActionType } from './../../app/app-reducer';
import { Dispatch } from 'redux';
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerNetworkError = (message: string, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
  dispatch(setAppErrorAC(message ? {error: message} : {error: 'Some error occurred'}))
  dispatch(setAppStatusAC({status:'failed'}))
}
