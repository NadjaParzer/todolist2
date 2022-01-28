import { RequestStatusType } from './../../../app/app-reducer';

import { changeTodolistFilterAC, todolistsReducer, todolistID1, TodolistDomainType, FilterValuesType, setTodolistsAC, changeTodolistEntityStatus, removeTodolistTC, addTodolistTC, changeTodolistTitleTC } from '../todolists-reducer';
import {v1} from 'uuid';
import { TodolistType } from '../../../api/todolist-api';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {id: todolistId1, title: "What to learn", filter: "all", order:0, addedDate:'', entityStatus: 'idle' },
    {id: todolistId2, title: "What to buy", filter: "all", order:0, addedDate:'', entityStatus: 'idle'}
  ]
})

test('correct todolist should be removed', () => {
   const endState = todolistsReducer(startState, removeTodolistTC.fulfilled({id:todolistId1}, 'requestId', todolistId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let newTodolistTitle = "New Todolist";

  const todolist: TodolistType =  {
    id: 'string',
    title: newTodolistTitle,
    order: 0,
    addedDate: ''
  }
  const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist}, 'requestId', todolist.id))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = "New Todolist";
  const action = changeTodolistTitleTC.fulfilled({title: newTodolistTitle, id: todolistId2}, 'requestId',{title: newTodolistTitle, id: todolistId2} )
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = "completed";
  const action = changeTodolistFilterAC({filter: newFilter, id: todolistId2})
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test('correct status of todolist should be changed', () => {
  let newStatus: RequestStatusType = "loading";
  const action = changeTodolistEntityStatus({status: newStatus, id: todolistId2})
  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});

test('todolists should be set to the state', () => {
  const action = setTodolistsAC({todolists: startState})
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})


