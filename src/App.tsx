import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TodolistOld } from './TodolistOld';
import { TaskPriorities, TaskStatuses, TaskType, TodolistType } from './api/todolist-api';
import { FilterValuesType, TodolistDomainType } from './state/todolists-reducer';



export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    { todolistId: todolistID1, title: 'What to learn', filter: 'all', order:0, addedDate:'' },
    { todolistId: todolistID2, title: 'What to buy', filter: 'all', order:0, addedDate:'' },
  ])


  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [{ id: v1(), todoListId: todolistID1, title: 'CSS', completed: false, status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
    { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
    { id: v1(), title: 'React', status: TaskStatuses.New, todoListId: todolistID1, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    { id: v1(), title: 'Vui', status: TaskStatuses.Completed, todoListId: todolistID1, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  }],
    [todolistID2]: [
      { id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    { id: v1(), title: 'Bread', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    ]
  })

  const [filter, setFilter] = useState<FilterValuesType>('all')

  function changeFilter(value: FilterValuesType, todolistID: string) {
    let todolist = todolists.find(tl => tl.todolistId === todolistID)
    if(todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }
  function removeTask(id: string, todolistID: string) {
    let newTasks = tasks[todolistID].filter(t => t.id != id)
    tasks[todolistID] = newTasks
    setTasks({...tasks})
  }
  function addTask(title: string, todolistID: string) {
    let newTask = { id: v1(), title, status: TaskStatuses.New, todoListId: todolistID, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }
    let newTasks = tasks[todolistID]
    let newTasksForRender = [newTask, ...newTasks]
    tasks[todolistID] = newTasksForRender
    setTasks({...tasks})
  }
  function changeStatus(taskId: string, status: TaskStatuses, todolistID: string) {
    let tasksNew = tasks[todolistID]
    let task = tasksNew.find(t => t.id === taskId)
    if (task) {
       task.status = status 
       setTasks({...tasks})
      }
  }
  function removeTodolist(todolistID: string) {
    let filteredTodolists = todolists.filter(tl => tl.todolistId !== todolistID)
    delete tasks[todolistID]
    setTodolists(filteredTodolists)
    setTasks({...tasks})
  }
  function changeTodolistTitle(newTitle: string, todolistID: string) {
   const todolist = todolists.find(tl => tl.todolistId === todolistID)
    if(todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }
  function addTodolist(title: string) {
    let todolist: TodolistDomainType = {
      todolistId: v1(),
      filter: 'all',
      title,
      addedDate: '',
      order: 0
    }
    setTodolists([todolist, ...todolists])
    setTasks({...tasks, [todolist.todolistId]: []})
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistID: string) {
    let tasksNew = tasks[todolistID]
    let task = tasksNew.find(t => t.id === taskId)
    if (task) {
       task.title = newTitle 
       setTasks({...tasks})
      }
  }

  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid style={{padding: '20px'}} container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3} >
            {todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.todolistId]
                    if (tl.filter === 'completed') {
                      tasksForTodolist = tasks[tl.todolistId].filter(t => t.status === TaskStatuses.Completed)
                    } else if (tl.filter === 'active') {
                      tasksForTodolist = tasks[tl.todolistId].filter(t => t.status === TaskStatuses.New)
                    }
                    return  <Grid item>
                        <Paper style={{padding: '10px'}}>
                          <TodolistOld 
                      key={tl.todolistId}
                      todolistID={tl.todolistId}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                      removeTask={removeTask} addTask={addTask} changeTaskStatus={changeStatus}
                      changeFilter={changeFilter} filter={tl.filter} tasks={tasksForTodolist} title={tl.title} />
                        </Paper>
                      
                    </Grid> 
                  })}
        </Grid>
     
      </Container>
      
    </div>
  );
}

export default App;
