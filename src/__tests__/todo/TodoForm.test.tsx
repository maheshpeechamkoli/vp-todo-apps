import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from '../../components/todo/TodoForm';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn() as () => jest.Mock,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

interface MockTodoData {
  id?: string;
  task: string;
  isDone: boolean;
  deadline?: Date;
}

function renderTodoForm(props: { toto: MockTodoData }) {
  return render(<TodoForm isUpdate {...props} />);
}
describe('TodoForm Component', () => {
  const mockTodoData: MockTodoData = {
    id: 'b1205b3a-104b-4083-ad88-b72b891c6e60',
    task: 'Take Medicine',
    deadline: new Date('2024-02-25T09:42:31.58Z'),
    isDone: false,
  };

  test('handleChange updates formData correctly', () => {
    const { getByLabelText } = renderTodoForm({ toto: mockTodoData });

    const taskInput = getByLabelText('Task') as HTMLInputElement;

    fireEvent.change(taskInput, { target: { value: 'Updated Task' } });

    expect(taskInput.value).toBe('Updated Task');
  });

  test('shows validation message when task is less than or equal to 10 characters', () => {
    render(<TodoForm />);

    const taskInput = screen.getByRole('textbox', { name: /task/i });

    fireEvent.change(taskInput, { target: { value: 'Short' } });

    const validationMessage = screen.getByText(/Task must be more than 10 characters\./i);

    expect(validationMessage).toBeInTheDocument();
  });

  test('shows validation message when deadline is set to a past date', () => {
    render(<TodoForm />);

    // Find the deadline input field by its label
    const deadlineInput = screen.getByLabelText(/Deadline/i);

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().slice(0, 10);

    // Simulate setting a past date as the deadline
    fireEvent.change(deadlineInput, { target: { value: pastDateString } });

    const validationMessage = screen.getByText(/Deadline must be a valid date\./i);

    expect(validationMessage).toBeInTheDocument();
  });
});
