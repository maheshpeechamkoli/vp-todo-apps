import { render, screen } from '@testing-library/react';
import React from 'react';

import List from '../../components/todo/List';
import * as todoService from '../../services/todo-service';

// Mocking the toast method
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn() as () => jest.Mock,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));
jest.mock('../../services/todo-service');

describe('List Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders with data', async () => {
    (todoService.getAllTodos as jest.Mock).mockResolvedValue([
      {
        id: 'b1205b3a-104b-4083-ad88-b72b891c6e60',
        task: 'Take Medicine',
        deadline: '2024-02-25T09:42:31.58Z',
        isDone: false,
      },
      {
        id: 'd8f58824-6fb1-45a3-a38a-1903c6616462',
        task: 'Buy Groceries',
        deadline: '2024-02-26T00:00:00Z',
        isDone: true,
      },
    ]);
    render(<List />);

    const firstTodoItem = await screen.findByText('Take Medicine');
    expect(firstTodoItem).toBeInTheDocument();

    const secondTodoItem = await screen.findByText('Buy Groceries');
    expect(secondTodoItem).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  test('renders the component with no data', async () => {
    (todoService.getAllTodos as jest.Mock).mockResolvedValueOnce([]);
    render(<List />);
    const noDataText = await screen.findByText(/Whoops! No data found\./i);
    expect(noDataText).toBeInTheDocument();
  });
});
