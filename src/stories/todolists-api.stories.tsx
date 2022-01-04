import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api';

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data);
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
   todolistAPI.createTodolists('NEW').then((res) => {
      setState(res.data);
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a45ae82e-8181-4f8e-aa91-a533bc4015c8';
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a45ae82e-8181-4f8e-aa91-a533bc4015c8'
    todolistAPI.updateTodolist(todolistId, 'New New TITLE')
      .then((res) => {
        setState(res.data)
      })

  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '642580ac-5fb6-4b5a-a5e9-bfdbedc490cb'
  useEffect(() => {
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data);
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '642580ac-5fb6-4b5a-a5e9-bfdbedc490cb'
  useEffect(() => {
   todolistAPI.createTask(todolistId, 'Very NEW TASK').then((res) => {
      setState(res.data);
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '04e9ef27-46b9-447a-9f6e-59434c532fc3'
  const taskId = '3608d6d6-196d-4c1a-aa75-546ab0fbd4c3'
  useEffect(() => {
   todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '642580ac-5fb6-4b5a-a5e9-bfdbedc490cb'
  const taskId = '9568dc59-d39e-4eb7-bc07-30e9db83d640'
  
  const model = {
    title: 'SUPER!!!!',
  description: 'description alles über task',
  completed: false,
  status: 1,
  priority: 2,
  startDate: 'string',
  deadline: 'string'
  }
  useEffect(() => {
   todolistAPI.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data);
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}