import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, RequestStatusType } from './../../app/app-reducer';
import { AppRootState } from '../../app/store';
import { UpdateTaskModelType, TodolistType } from '../../api/todolist-api';
import { addTodolistAC, AddTodolistActionType, ClearTodoDataType, RemoveTodolistActionType, SetTodolistsActionType, todolistID1, todolistID2, removeTodolistAC, clearTodolistsAC, setTodolistsAC } from './todolists-reducer';
import {v1} from 'uuid';
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { handleServerAppError } from '../../utils/errorUtils/handleServerAppError';
import { handleServerNetworkError } from '../../utils/errorUtils/handleServerNetworkError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:TasksStateType = {
  // [todolistID1]: [{ id: v1(), title: 'CSS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'', entityStatus: 'idle' },
  // { id: v1(), title: 'JS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'', entityStatus: 'idle' },
  // { id: v1(), title: 'React', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'', entityStatus: 'idle' },
  // { id: v1(), title: 'Vui', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'', entityStatus: 'idle' }],
  // [todolistID2]: [
  //   { id: v1(), title: 'Milk', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'', entityStatus: 'idle' },
  // { id: v1(), title: 'Bread', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' , entityStatus: 'idle'},
  // ]
}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await todolistAPI.getTasks(id)
    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { id, tasks: res.data.items }
  } catch (error: any) {
    handleServerNetworkError(error.message, thunkAPI.dispatch)
  }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { id: string, taskId: string }, thunkAPI) => {
  thunkAPI.dispatch(changeTaskEntityStatus({ entityStatus: 'loading', taskId: param.taskId, id: param.id }))
  // try {
    const res = await todolistAPI.deleteTask(param.id, param.taskId)
    return { taskId: param.taskId, id: param.id }
  // } catch (error: any) {
  //   handleServerNetworkError(error.message, thunkAPI.dispatch)
  // }
})

// export const removeTaskTC = (id: string, taskId: string) => (dispatch: Dispatch) => {
//   dispatch(changeTaskEntityStatus({entityStatus: 'loading', taskId, id}))
//     todolistAPI.deleteTask(id, taskId)
//       .then(res => {
//         const action = removeTaskAC({taskId, id})
//         dispatch(action)
//       })
//   }



const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    // removeTaskAC(state, action: PayloadAction<{taskId: string, id: string}>) {
    //   const index = state[action.payload.id].findIndex(t => t.id === action.payload.taskId)
    //   if (index > -1) {
    //     state[action.payload.id].splice(index, 1)
    //   }
    // },
    addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(state, action: PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, id: string}>) {
      const tasks = state[action.payload.id]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    },
    // setTasksAC(state, action: PayloadAction<{id: string, tasks: Array<TaskType>}>) {
    //   state[action.payload.id] = action.payload.tasks
    // },
    changeTaskEntityStatus(state, action: PayloadAction<{
      entityStatus: RequestStatusType,
      taskId: string, id: string
    }>) {
      const tasks = state[action.payload.id]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index].entityStatus = action.payload.entityStatus
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => state[tl.id] = [])
    })
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.id] = action.payload.tasks
      }
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.id].findIndex(t => t.id === action.payload.taskId)
        if (index > -1) {
          state[action.payload.id].splice(index, 1)
        }
      }
    })
    builder.addCase(clearTodolistsAC, (state, action) => {
      return {}
    })

    // [removeTodolistAC.type]: (state, action: PayloadAction<{id: string}>) => {},
    // [addTodolistAC.type]: (state, action: PayloadAction<{todolist: TodolistType}>) => {},
    // [setTodolistsAC.type]: (state, action: PayloadAction<{todolists: Array<TodolistType>}>) => {},
    // [clearTodolistsAC.type]: (state, action: PayloadAction<{}>) => {},
  }
})

export const tasksReducer = slice.reducer
export const {addTaskAC,updateTaskAC, changeTaskEntityStatus} = slice.actions

// actions
// export const removeTaskAC = (taskId: string, id: string) => ({ type: 'REMOVE-TASK',taskId, id} as const)
// export const addTaskAC = ( task: TaskType) => ({ type: 'ADD-TASK', task} as const)
// export const changeTaskTitleAC = (taskId: string, title: string, id: string) => ({ type: 'CHANGE-TASK-TITLE', title, taskId, id } as const)
// export const updateTaskAC = ( taskId: string, model: UpdateDomainTaskModelType, id: string) => ({ type: 'UPDATE-TASK', id, taskId, model } as const)
// export const setTasksAC = (id: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', id, tasks} as const)
// export const changeTaskEntityStatus = (entityStatus: RequestStatusType, taskId: string, id: string) =>
// ({ type: 'CHANGE-TASK-ENTITY-STATUS', entityStatus, taskId, id } as const)

// thunks
// export const fetchTasksTC_ = (id: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({status:'loading'}))
//     todolistAPI.getTasks(id)
//       .then(res => {
//         //console.log('IDTODOLIST', todolistId)
//         dispatch(setTasksAC({id, tasks: res.data.items}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//       })
//       .catch(
//         (error) => {
//           handleServerNetworkError(error.message, dispatch)
//         }
//       )
//   }

export const addTaskTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status:'loading'}))
  todolistAPI.createTask(id, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        let task = res.data.data.item
        dispatch(addTaskAC({task}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error.message, dispatch)
    })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, id: string) =>
  (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState()
    let task = state.tasks[id].find(t => t.id === taskId)
    if (!task) {
      //throw new Error('task is not found')
      console.warn('task is not found in the state!')
      return
    }
    const apiModel: UpdateTaskModelType = {
      completed: task.completed,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      title: task.title,
      ...domainModel
    }
    dispatch(changeTaskEntityStatus({entityStatus: 'loading', taskId, id}))
    todolistAPI.updateTask(id, taskId, apiModel).then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({taskId, model: domainModel, id}))
          dispatch(changeTaskEntityStatus({entityStatus: 'succeeded', taskId, id}))
        } else {
          handleServerAppError(res.data, dispatch)
          dispatch(setAppStatusAC({status: 'failed'}))
        }
      }
    )
    .catch((error) => {
      handleServerNetworkError(error.message, dispatch)
    })
  }

  export type TasksStateType = {
    [key: string]: Array<TaskType>
  }
  
  export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
  }

  // types
//export type SetTaskType = ReturnType<typeof setTasksAC> 
// type ActionsType = ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | SetTaskType
//   | ReturnType<typeof changeTaskEntityStatus>
//   | AddTodolistActionType
//   | RemoveTodolistActionType
//   | SetTodolistsActionType
//   | ClearTodoDataType

// export const tasksReducer = (state: TasksStateType=initialState, action: any): TasksStateType => {
//   switch(action.type) {
//     case setTodolistsAC.type: {
//       let stateCopy = {...state}
//       action.payload.todolists.forEach((tl: any) => {
//         stateCopy[tl.id] = []
//       })
//       return stateCopy
//     }
//     case 'SET-TASKS':
//       return {...state, [action.id]: action.tasks}
//       // let stateCopy = {...state}
//       // stateCopy[action.id] = action.tasks
//       // return stateCopy
//     case 'REMOVE-TASK': 
//       return { ...state, [action.id]: state[action.id].filter( t => t.id !== action.taskId)}
//     //  let stateCopy = {...state}
//     //  const tasks = state[action.id]
//     //  const newTasks = tasks.filter( t => t.id !== action.taskId)
//     //  stateCopy[action.id] = newTasks
//     //  return stateCopy
//     case 'ADD-TASK' : 
//       return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//       // let stateCopy = {...state}
//       // let newTask = action.task
//       // let tasks = stateCopy[action.task.todoListId]
//       // let newTasks = [newTask, ...tasks]
//       // stateCopy[action.task.todoListId] = newTasks
//       // return stateCopy
//     case 'CHANGE-TASK-TITLE': 
//       return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
//       // let todolistTasks = state[action.id]
//       // state[action.id] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t )
//       // return {...state}

//       // let stateCopy = {...state}
//       // let tasks = stateCopy[action.todolistId]
//       // stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
//       // return stateCopy
//     case 'CHANGE-TASK-ENTITY-STATUS':
//       return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)}
//     case 'UPDATE-TASK': 
//       return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
//       // const stateCopy = {...state}
//       // let tasks = stateCopy[action.id]
//       // stateCopy[action.id] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//       // return stateCopy
//     case addTodolistAC.type:
//       return {...state, [action.payload.todolist.id]: []}
//       // let stateCopy = {...state}
//       // stateCopy[action.todolist.id] = []
//       // return stateCopy
//     case removeTodolistAC.type: {
//       let stateCopy = {...state}
//       delete stateCopy[action.payload.id] 
//       return stateCopy
//     }
//     case clearTodolistsAC.type:
//       return {}
//     default: 
//     return state
//     //throw new Error('Failed action type!')
//   }
// }