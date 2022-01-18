import { authReducer } from './../components/Login/auth-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "../components/Todolists/tasks-reducer";
import { todolistsReducer } from "../components/Todolists/todolists-reducer";
import { appReducer } from "./app-reducer";
import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

// type AppRootState = {
//   todolists: Array<TodolistType>
//   tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>
// 
// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store