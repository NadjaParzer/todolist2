

import axios from 'axios';

export type TodolistType = {
  todolistId: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<Data={}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: Data
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft =3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Ufgently =3,
  Later =4
}
export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
type TasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
export type UpdateTaskModelType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
       'API-KEY': '0953c110-2e83-40a7-8c09-25e99de87d0b'
  }
})

export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>('todo-lists')
    return promise
  },
  updateTodolist(todolistId: string, title: string) {
      const promise = instance.put<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}`, {title: title})
      return promise
  },
  createTodolists(title: string) {
    const promise = instance.post<ResponseType>('todo-lists', { title: title })
    return promise
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    return promise
  },
  getTasks(todolistId: string) {
    const promise = instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    return promise
  },
  createTask(todolistId: string, title: string) {
    return instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType) {
    return instance.put<ResponseType<{item: UpdateTaskModelType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }

}
