import { removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import {TasksStateType} from '../App';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';

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
  const action = removeTaskAC("2", "todolistId2")
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
      const action = addTaskAC("juce", "todolistId2");
      const endState = tasksReducer(startState, action)
   
      expect(endState["todolistId1"].length).toBe(3);
      expect(endState["todolistId2"].length).toBe(4);
      expect(endState["todolistId2"][0].id).toBeDefined();
      expect(endState["todolistId2"][0].title).toBe("juce");
      expect(endState["todolistId2"][0].status).toBe(0);
   })

   test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", 0, "todolistId2");
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
  });
 
  test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "kefir", "todolistId2");
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].title).toBe("kefir");
    expect(endState["todolistId1"][1].title).toBe("JS");
  });
 
  test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC("new todolist");
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
  const action = removeTodolistAC("todolistId2");
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolistsAC([
    {todolistId: '1', title: "What to learn", order:0, addedDate:'' },
    {todolistId: '2', title: "What to buy", order:0, addedDate:''}
  ]);
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

   
