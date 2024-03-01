import { addTodo, deleteTodo, getAllTodos, markAsDone, updateTodo } from '../../test/todoServiceMock';

jest.mock('axios');

describe('Todo Service Jest Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Add Todo', async () => {
    const todoData = {
      task: 'Take Medicine',
      deadline: '2024-02-25T09:42:31.580Z',
    };

    const result = await addTodo(todoData);

    // Check that addTodo was called with the correct arguments
    expect(addTodo).toHaveBeenCalledWith(todoData);

    // Check that the result matches the expected value
    expect(result).toEqual({
      message: 'Task added successfully.',
    });
  });

  test('Update Todo', async () => {
    const todoData = {
      id: 'e4e72e36-608d-4346-babb-a8d1dfabebcf',
      task: 'Take Medicine',
      deadline: '2024-02-26T09:42:31.580Z',
      isDone: true,
    };
    const result = await updateTodo(todoData);

    // Check that addTodo was called with the correct arguments
    expect(updateTodo).toHaveBeenCalledWith(todoData);

    // Check that the result matches the expected value
    expect(result).toEqual({
      message: 'Task updated successfully.',
    });
  });

  test('Get All Todos', async () => {
    getAllTodos.mockImplementation(async () => {
      return [
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
      ];
    });

    const result = await getAllTodos();

    expect(getAllTodos).toHaveBeenCalledTimes(1);

    expect(result).toEqual([
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
    ]);
  });

  test('Delete Todo', async () => {
    const id = 'd8f58824-6fb1-45a3-a38a-1903c6616462';
    await deleteTodo(id);
    expect(deleteTodo).toHaveBeenCalledWith(id);
  });

  test('Mark as done', async () => {
    const id = 'd8f58824-6fb1-45a3-a38a-1903c6616462';
    const isDone = true;
    await markAsDone(id, isDone);
    expect(markAsDone).toHaveBeenCalledWith(id, isDone);
  });
});
