import { Provider } from "react-redux"
import { combineReducers, createStore, applyMiddleware } from "redux"
import { AppRootState} from "../app/store"
import { tasksReducer } from "../components/Todolists/tasks-reducer"
import { appReducer } from "../app/app-reducer"
import { todolistsReducer } from "../components/Todolists/todolists-reducer"
import {v1} from 'uuid'
import { TaskPriorities, TaskStatuses } from "../api/todolist-api"
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
})
const initialGlobalState = {
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
    status: 'idle'
  }
};

const store = createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk ) )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>
   { storyFn()}
  </Provider> 
}