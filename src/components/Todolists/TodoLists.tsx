import React, { useCallback, useEffect } from 'react';
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType, removeTodolistTC, TodolistDomainType } from './todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../app/store';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from '../common/AddItemForm';
import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router';

type TodoListsDomainType = {
}

export const TodoLists = (props: TodoListsDomainType) => {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>((state) => state.todolists)
  //const [filter, setFilter] = useState<FilterValuesType>('all')
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  console.log('isLoggedIn TODOL',isLoggedIn)
 
  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  const removeTodolist = useCallback((todolistID: string) => {
    const action = removeTodolistTC(todolistID)
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
    dispatch(changeTodolistTitleTC(newTitle, todolistID))
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistTC(title)
    dispatch(action)
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
    const action = changeTodolistFilterAC({filter: value, id: todolistID})
    dispatch(action)
    console.log('action', action)
  }, [dispatch])

  if(!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  
  return <>
    <Grid style={{ padding: '20px' }} container>
      <AddItemForm addItem={addTodolist} />
    </Grid>
    <Grid container spacing={3} >
      {todolists.map(tl => {
        return <Grid item>
          <Paper style={{ padding: '10px' }}>
            <Todolist
              key={tl.id}
              todolist={tl}
              removeTodolist={removeTodolist}
              changeTodolistTitle={changeTodolistTitle}
              changeFilter={changeFilter} />
          </Paper>
        </Grid>
      })}
    </Grid>
  </>
}
