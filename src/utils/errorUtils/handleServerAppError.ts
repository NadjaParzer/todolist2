import { SetAppErrorActionType,SetAppStatusActionType } from './../../app/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from "../../api/todolist-api"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerAppError = <D>( data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType >) => {
  if (data.messages.length) {
          dispatch(setAppErrorAC(data.messages[0]))
        } else {
          dispatch(setAppErrorAC('some error occurred'))
        }
        dispatch(setAppStatusAC('failed')) 
}
 