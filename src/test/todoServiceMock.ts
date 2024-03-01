export const addTodo = jest.fn(async (todoData): Promise<object> => {
  if (todoData) {
    return {
      message: 'Task added successfully.',
    };
  } else {
    return Promise.reject(new Error('Invalid'));
  }
});

export const updateTodo = jest.fn(async (todoData): Promise<object> => {
  if (todoData) {
    return {
      message: 'Task updated successfully.',
    };
  } else {
    return Promise.reject(new Error('Invalid'));
  }
});

export const getAllTodos = jest.fn(() =>
  Promise.resolve([
    {
      id: 'b1205b3a-104b-4083-ad88-b72b891c6e60',
      task: 'Take Medicine',
      deadline: '2024-02-25T09:42:31.58Z',
      isDone: false,
    },
    {
      id: 'd8f58824-6fb1-45a3-a38a-1903c6616462',
      task: 'Buy this all',
      deadline: '2024-02-26T00:00:00Z',
      isDone: true,
    },
  ])
);

export const deleteTodo = jest.fn(async (id): Promise<object> => {
  if (id) {
    return {
      message: 'Todo deleted successfully.',
    };
  } else {
    return Promise.reject(new Error('Invalid provided'));
  }
});

export const markAsDone = jest.fn(async (id, isDone): Promise<object> => {
  if (id && isDone) {
    return {
      message: 'Todo updated successfully.',
    };
  } else {
    return Promise.reject(new Error('Invalid provided'));
  }
});
