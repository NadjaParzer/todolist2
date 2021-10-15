import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';



function App() {

  let tasks1: Array<TaskType> = [
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false},
  ]
  let tasks2: Array<TaskType> = [
    {id: 1, title: 'Thunk', isDone: true},
    {id: 2, title: 'Hooks', isDone: false},
    {id: 3, title: 'HOC', isDone: false},
  ]
  return (
    <div className="App">
      <Todolist tasks={tasks1} title='What to learn' />
      <Todolist tasks={tasks2} title='What to buy' />
      <Todolist tasks={tasks1} title ='What to sell' />
    </div>
  );
}

export default App;
