import { Provider } from "react-redux"
import { combineReducers, createStore, applyMiddleware } from "redux"
import { AppRootState} from "../app/store"
import { tasksReducer } from "../components/Todolists/tasks-reducer"
import { appReducer } from "../app/app-reducer"
import { todolistsReducer } from "../components/Todolists/todolists-reducer"
import {v1} from 'uuid'
import { TaskPriorities, TaskStatuses } from "../api/todolist-api"
import { authReducer } from "../components/Login/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import { HashRouter} from 'react-router-dom';


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})
const initialGlobalState: AppRootState = {
  todolists: [
      {id: "todolistId1", title: "What to read", filter: "all", order:0, addedDate:'', entityStatus: 'idle'},
      {id: "todolistId2", title: "What to sell", filter: "all", order:0, addedDate:'', entityStatus: 'idle'}
  ] ,
  tasks: {
      ["todolistId1"]: [
          {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''},
          {id: v1(), title: "JS", status: TaskStatuses.Completed,todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''}
      ],
      ["todolistId2"]: [
          {id: v1(), title: "Milk", status: TaskStatuses.Completed,todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''},
          {id: v1(), title: "React Book", status: TaskStatuses.Completed,todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''}
      ]
  },
  app: {
    error: null,
    status: 'succeeded',
    initialized: true
  },
  auth: {
    isLoggedIn: false
  }
};

const store =  configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>
   { storyFn()}
  </Provider> 
}
export const HashRouterDecorator = (storyFn: any) => {
  return <HashRouter>
   { storyFn()}
  </HashRouter> 
}