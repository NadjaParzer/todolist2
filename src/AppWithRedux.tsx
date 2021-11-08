import React, { useCallback } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
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
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
console.log('APP is called!')
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists)
  //const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTodolist = useCallback((todolistID: string) => {
    const action = removeTodolistAC(todolistID)
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
    dispatch(changeTodolistTitleAC(newTitle, todolistID))
  }, [dispatch])
  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
   
    const action = changeTodolistFilterAC(value, todolistID)
    dispatch(action)
     console.log('action', action)
  }, [dispatch])

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
        <Grid style={{ padding: '20px' }} container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3} >
          {todolists.map(tl => {
            return <Grid item>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  key={tl.id}
                  todolistID={tl.id}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  changeFilter={changeFilter} filter={tl.filter} title={tl.title} />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
