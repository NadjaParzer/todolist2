import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { AppRootState} from "../state/store"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"
import {v1} from 'uuid'


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})
const initialGlobalState = {
  todolists: [
      {id: "todolistId1", title: "What to read", filter: "all"},
      {id: "todolistId2", title: "What to sell", filter: "all"}
  ] ,
  tasks: {
      ["todolistId1"]: [
          {id: v1(), title: "HTML&CSS", isDone: true},
          {id: v1(), title: "JS", isDone: true}
      ],
      ["todolistId2"]: [
          {id: v1(), title: "Milk", isDone: true},
          {id: v1(), title: "React Book", isDone: false}
      ]
  }
};

const store = createStore(rootReducer, initialGlobalState as AppRootState )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>
   { storyFn()}
  </Provider> 
}