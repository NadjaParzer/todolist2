import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { AppRootState} from "../state/store"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"
import {v1} from 'uuid'
import { TaskPriorities, TaskStatuses } from "../api/todolist-api"


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})
const initialGlobalState = {
  todolists: [
      {todolistId: "todolistId1", title: "What to read", filter: "all", order:0, addedDate:''},
      {todolistId: "todolistId2", title: "What to sell", filter: "all", order:0, addedDate:''}
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
  }
};

const store = createStore(rootReducer, initialGlobalState as AppRootState )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>
   { storyFn()}
  </Provider> 
}