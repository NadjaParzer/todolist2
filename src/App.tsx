import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
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

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])


  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [{ id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Vui', isDone: true }],
    [todolistID2]: [
      { id: v1(), title: 'Milk', isDone: true },
    { id: v1(), title: 'Bread', isDone: false },
    ]
  })

  const [filter, setFilter] = useState<FilterValuesType>('all')

  function changeFilter(value: FilterValuesType, todolistID: string) {
    let todolist = todolists.find(tl => tl.id === todolistID)
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
    let newTask = { id: v1(), title, isDone: false }
    let newTasks = tasks[todolistID]
    let newTasksForRender = [newTask, ...newTasks]
    tasks[todolistID] = newTasksForRender
    setTasks({...tasks})
  }
  function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
    let tasksNew = tasks[todolistID]
    let task = tasksNew.find(t => t.id === taskId)
    if (task) {
       task.isDone = isDone 
       setTasks({...tasks})
      }
  }
  function removeTodolist(todolistID: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistID)
    delete tasks[todolistID]
    setTodolists(filteredTodolists)
    setTasks({...tasks})
  }
  function changeTodolistTitle(newTitle: string, todolistID: string) {
   const todolist = todolists.find(tl => tl.id === todolistID)
    if(todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }
  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title
    }
    setTodolists([todolist, ...todolists])
    setTasks({...tasks, [todolist.id]: []})
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
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'completed') {
                      tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                    } else if (tl.filter === 'active') {
                      tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    return  <Grid item>
                        <Paper style={{padding: '10px'}}>
                          <Todolist 
                      key={tl.id}
                      todolistID={tl.id}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                      removeTask={removeTask} addTask={addTask} changeStatus={changeStatus}
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
