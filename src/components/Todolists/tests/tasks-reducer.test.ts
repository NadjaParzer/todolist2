import { fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC } from './../tasks-reducer';
import { tasksReducer,TasksStateType } from '../tasks-reducer';
import { addTodolistTC, removeTodolistTC, setTodolistsAC } from '../todolists-reducer';
import { TaskPriorities, TaskStatuses, TaskType, TodolistType } from '../../../api/todolist-api';
import { v1 } from 'uuid';

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
    "todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
        { id: "2", title: "milk", status:TaskStatuses.Completed, todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:''  }
    ]
 };
})

test('correct task should be deleted from correct array', () => {
  const param = { taskId: "2", id: "todolistId2" };
  const action = removeTaskTC.fulfilled(param, '', param)
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
   "todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
       { id: "2", title: "JS", status:TaskStatuses.Completed, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", completed: false, description:'', priority: TaskPriorities.Middle, startDate: '', deadline:'', order: 1, addedDate:'' }
   ]
});
expect(endState["todolistId1"].length).toBe(3);
expect(endState["todolistId2"].length).toBe(2);
expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy(); // toBe(true)
expect(endState["todolistId2"][0].id).toBe("1");
});

test('correct task should be added to correct array', () => {
     
  const task: TaskType =  {
    title: 'juce',
    todoListId: 'todolistId2',
    status: TaskStatuses.New,
    completed: false,
    description: '',
    priority: TaskPriorities.High,
    addedDate: '',
    deadline: '',
    id: '11',
    startDate: '',
    order: 1
  }
      const action = addTaskTC.fulfilled(task, "requestId", {id: task.todoListId, title: task.title});
      const endState = tasksReducer(startState, action)
   
      expect(endState["todolistId1"].length).toBe(3);
      expect(endState["todolistId2"].length).toBe(4);
      expect(endState["todolistId2"][0].id).toBeDefined();
      expect(endState["todolistId2"][0].title).toBe("juce");
      expect(endState["todolistId2"][0].status).toBe(0);
   })

   test('status of specified task should be changed', () => {
    let updateModel = {taskId: "2", domainModel: {status: 0}, id: "todolistId2"}
    const action = updateTaskTC.fulfilled(updateModel,
    "requestId", updateModel );
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
  });
 
  test('title of specified task should be changed', () => {
    let updateModel = {taskId: "2", domainModel: {title: "kefir"}, id: "todolistId2"}
    const action = updateTaskTC.fulfilled(updateModel,
    "requestId", updateModel );
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].title).toBe("kefir");
    expect(endState["todolistId1"][1].title).toBe("JS");
  });
 
  test('new array should be added when new todolist is added', () => {
    const todolist: TodolistType = {
      id: 'string',
      title: 'new todolist',
      order: 0,
      addedDate: ''
    }
  const action = addTodolistTC.fulfilled( {todolist}, 'requestId', todolist.title)
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
      throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolistTC.fulfilled({ id: "todolistId2"}, 'requestId', "todolistId2");
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolistsAC({ todolists: [
    {id: '1', title: "What to learn", order:0, addedDate:'' },
    {id: '2', title: "What to buy", order:0, addedDate:''}
  ]});
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {
  //const action= setTasksAC({id: 'todolistId1', tasks: startState['todolistId1']})
  const action= fetchTasksTC.fulfilled({id: 'todolistId1', tasks: startState['todolistId1']}, '', 'todolistId1')

  const endState = tasksReducer({
    'todolistId2': [],
    'todolistId1': []
  }, action)

  const keys = Object.keys(endState);

  
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
})