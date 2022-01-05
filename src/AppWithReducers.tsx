import React, { useReducer, useState } from 'react';
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
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, TodolistDomainType, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { title } from 'process';
import { TodolistOld } from './TodolistOld';
import { TaskPriorities, TaskStatuses, TaskType } from './api/todolist-api';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithUseReducers() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { todolistId: todolistID1, title: 'What to learn', filter: 'all', order:0, addedDate:''  },
    { todolistId: todolistID2, title: 'What to buy', filter: 'all', order:0, addedDate:''  },
  ])


  let [tasks, dispachToTaskReducer] = useReducer(tasksReducer, {
    [todolistID1]: [{ id: v1(), title: 'CSS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
    { id: v1(), title: 'JS', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    { id: v1(), title: 'React', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    { id: v1(), title: 'Vui', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  }],
    [todolistID2]: [
      { id: v1(), title: 'Milk', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    { id: v1(), title: 'Bread', status: TaskStatuses.Completed,todoListId: todolistID2, completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
    ]
  })

  const [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: string, todolistID: string) {
    const action = removeTaskAC(id, todolistID)
    dispachToTaskReducer(action)
  }
  function addTask(title: string, todolistID: string) {
    const action = addTaskAC(title, todolistID)
    dispachToTaskReducer(action)
  }
  function changeStatus(taskId: string,  status: TaskStatuses, todolistID: string) {
    const action = changeTaskStatusAC(taskId, status, todolistID)
    dispachToTaskReducer(action)
  }
  function changeTaskTitle(taskId: string, newTitle: string, todolistID: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistID)
    dispachToTaskReducer(action)
  }

  function removeTodolist(todolistID: string) {
    const action = removeTodolistAC(todolistID)
    dispatchToTodolistsReducer(action)
    dispachToTaskReducer(action)
  }
  function changeTodolistTitle(newTitle: string, todolistID: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(title, todolistID))
  }
  function addTodolist(title: string) {
    const action = addTodolistAC(title)
    dispatchToTodolistsReducer(action)
    dispachToTaskReducer(action)
  }
  function changeFilter(value: FilterValuesType, todolistID: string) {
    const action = changeTodolistFilterAC(value, todolistID)
    dispatchToTodolistsReducer(action)
    console.log('action', action)
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

export default AppWithUseReducers;
