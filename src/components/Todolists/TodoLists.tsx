import React, { useCallback, useEffect } from 'react';
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType, removeTodolistTC, TodolistDomainType } from './todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../app/store';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from '../common/AddItemForm';
import { Grid, Paper } from '@mui/material';

type TodoListsDomainType = {
  demo?: boolean
}


export const TodoLists = ({demo, ...props}: TodoListsDomainType) => {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>((state) => state.todolists)
  //const [filter, setFilter] = useState<FilterValuesType>('all')

  useEffect(() => {
    if(demo) {
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
    const action = changeTodolistFilterAC(value, todolistID)
    dispatch(action)
     console.log('action', action)
  }, [dispatch])
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
                  todolistID={tl.id}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  changeFilter={changeFilter} filter={tl.filter} title={tl.title} />
              </Paper>
            </Grid>
          })}
        </Grid>
  </>
}