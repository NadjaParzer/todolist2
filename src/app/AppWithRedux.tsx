import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { TodoLists } from '../components/Todolists/TodoLists';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import ErrorSnackBar from '../components/common/ErrorSnackBar';
import { useSelector } from 'react-redux';
import { AppRootState } from './store';
import { RequestStatusType } from './app-reducer';

// export type TasksStateType = {
//   [key: string]: Array<TaskType>
// }

function AppWithRedux() {
  const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
  return (
    <div className="App">
      <ErrorSnackBar  />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
      <Container>
        <TodoLists />
      </Container>
    </div>
  );
}

export default AppWithRedux;
