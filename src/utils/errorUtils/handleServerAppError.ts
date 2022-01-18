import { SetAppErrorActionType,SetAppStatusActionType } from './../../app/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from "../../api/todolist-api"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerAppError = <D>( data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType >) => {
  if (data.messages.length) {
          dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
          dispatch(setAppErrorAC({error: 'some error occurred'}))
        }
        dispatch(setAppStatusAC({status: 'failed'})) 
}
 