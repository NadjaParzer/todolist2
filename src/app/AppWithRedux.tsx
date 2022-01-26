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
import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { CircularProgress } from '@mui/material';
import { logoutTC } from '../components/Login/auth-reducer';
import axios from 'axios';
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
  console.log('isInitialized APP',isInitialized)
  console.log('isLoggedIn APP',isLoggedIn)

  useEffect(() => {
    if(!demo) {
      dispatch(initializeAppTC())
      // ///// get a task by id
      //   axios.get('https://devops.webquake.com/webquakeDev01/SAVD-Schriftdolmetschen/_apis/wit/workitems/1302?api-version=6.1-preview.3', {headers: {
      //     'Acept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Basic bmFkamFwOmd4Z3dudWpmc3ZqcnlseXl0a2F1cHJubm1uamh6eXB1am13YmxweWJka2t2c3prZ3dtcnE=',
      //     }}).then(res => {
      //       console.log(res.data);

      //     })
      //     //// Get a list
      //  //axios.post(`https://devops.webquake.com/webquakeDev01/SAVD-Schriftdolmetschen/_apis/wit/wiql?api-version=5.1`, {
      //  axios.post(`https://devops.webquake.com/webquakeDev01/SAVD-Schriftdolmetschen/_apis/wit/wiql?api-version=6.0`, {
        
      //   //"query": "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType] = 'Task'" // - all items from all projects
      //   //"query": "SELECT [System.Id] FROM workitemLinks WHERE ([Source].[System.WorkItemType] = 'Task') AND ([System.Links.LinkType] = 'System.LinkTypes.Hierarchy-Reverse') AND ([Target].[System.WorkItemType] = 'User Story') MODE (DoesNotContain)"
      //   "query": "SELECT [System.Id], [System.Title],[System.AssignedTo], [System.State], [System.CommentCount]FROM workitems WHERE [System.WorkItemType] = 'Task' AND [State] <> 'Closed' AND [State] <> 'Removed' AND [System.TeamProject] = 'SAVD-Schriftdolmetschen' ORDER BY [System.ChangedDate] DESC"
      // // "query": "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType] = 'Task' AND [State] <> 'Closed' AND [State] <> 'Removed' order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc"
      // },{headers: {
      //  'Acept': 'application/json',
      //  'Content-Type': 'application/json',
      //  'Authorization': 'Basic bmFkamFwOmd4Z3dudWpmc3ZqcnlseXl0a2F1cHJubm1uamh6eXB1am13YmxweWJka2t2c3prZ3dtcnE=',
      //  }}).then( res => {
      //    console.log(res.data);
         ///// Create task:
      //    axios.post('https://devops.webquake.com/webquakeDev01/SAVD-Schriftdolmetschen/_apis/wit/workitems/$task?api-version=6.1-preview.3', [{
          
      //       "op": "add",
      //       "path": "/fields/System.Title",
      //       "from": null,
      //       "value": "Sample task - TEST"
          
      //    },{
      //     "op": "add",
      //     "path": "/fields/System.Description",
      //     "from": null,
      //     "value": " TEST Description"
      //     },
      //     {
      //     "op": "add",
      //     "path": "/fields/System.AssignedTo",
      //     "from": null,
      //     "value": "WEBQUAKE_AT-LE\\Nadjap"
      //    },
      //   {
      //     "op": "add",
      //     "path": "/fields/Microsoft.VSTS.Common.Priority",
      //     "from": null,
      //     "value": "2"
      //   }], {headers: {
      //     'Acept': 'application/json-patch+json',
      //     'Content-Type': 'application/json-patch+json',
      //     //'Authorization': 'Bearer ' + 'gxgwnujfsvjrylyytkauprnnmnjhzypujmwblpybdkkvszkgwmrq',
      //     'Authorization': 'Basic bmFkamFwOmd4Z3dudWpmc3ZqcnlseXl0a2F1cHJubm1uamh6eXB1am13YmxweWJka2t2c3prZ3dtcnE=',
      //     }}).then(res => {
      //       console.log(res.data)
      //     })
        // } )
    }
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
              <Route path="/" element={<TodoLists />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </div>
    </>
  );
}
export default AppWithRedux;
