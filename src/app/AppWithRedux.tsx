import React, { useCallback, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './store';
import { initializeAppTC, RequestStatusType } from './app-reducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { CircularProgress } from '@mui/material';
import { logoutTC } from '../components/Login/auth-reducer';
// export type TasksStateType = {
//   [key: string]: Array<TaskType>
// }

type PropsType = {
  demo?: boolean
}

function AppWithRedux({ demo = false, ...props }: PropsType) {
  const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootState, boolean>(state => state.app.initialized)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  if (!isInitialized) {
    return <CircularProgress style={{ position: 'fixed', top: '30%', left: '50%', width: 80, height: 80 }} /> }

  return (
    <>
      {/* <Helmet>
      <script type="text/javascript">
        {`
            window.onUsersnapCXLoad = function(api) {
              api.init();
              api.show('${USERSNAP_API_KEY}') 
            }
            var script = document.createElement('script');
            script.defer = 1;
            script.src = 'https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad';
            document.getElementsByTagName('head')[0].appendChild(script);
        `}
      </script>
    </Helmet> */}
      <BrowserRouter>
        <div className="App">
          <ErrorSnackBar />
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6" >
                News
              </Typography>
              { isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
            </Toolbar>
          </AppBar>
          <div className="progressLine">
            {status === 'loading' && <LinearProgress color="secondary" />}
          </div>
          <Container>
            <Routes>
              <Route path="/" element={<TodoLists demo={demo} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </>
  );
}
export default AppWithRedux;
