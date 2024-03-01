import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Todo } from '../../interface/todo';
import { addTodo, updateTodo } from '../../services/todo-service';
import './css/Todo.css';

interface TodoFormProps {
  isUpdate?: boolean;
  todoData?: Todo;
}

function TodoForm({ isUpdate, todoData }: TodoFormProps) {
  const navigate = useNavigate();

  const [taskError, setTaskError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);

  const [formData, setFormData] = useState({
    task: isUpdate ? todoData?.task || '' : '',
    deadline:
      isUpdate && todoData?.deadline
        ? new Date(todoData.deadline).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
  });

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'task') {
      setTaskError(value.length <= 10);
    }
    if (name === 'deadline') {
      setDeadlineError(new Date(value) < new Date(new Date().toISOString().slice(0, 10)));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hasValidationErrors = () => {
    return taskError || deadlineError || !formData.task;
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSave = () => {
    if (hasValidationErrors()) {
      toast.error('Validation errors or empty fields.');
      return;
    }
    const id = isUpdate ? todoData?.id : '';
    const isDone = todoData?.isDone ?? false;
    if (isUpdate) {
      if (!id) {
        console.error('Todo ID is undefined.');
        return;
      }
    }
    const postData: Todo = {
      id,
      task: formData.task,
      isDone,
      deadline: formData.deadline ? new Date(formData.deadline) : new Date(),
    };

    const apiCall = isUpdate ? updateTodo(postData) : addTodo(postData);

    apiCall
      .then(() => {
        toast.success(isUpdate ? 'Todo updated successfully!' : 'Todo created successfully!', {
          autoClose: 1000,
        });
        setFormData({
          task: '',
          deadline: new Date().toISOString().slice(0, 10),
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.response?.data || 'An error occurred.';
        toast.error(errorMessage, {
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border rounded p-3 formSection">
            <i
              className="fas fa-times-circle position-absolute top-0 end-0 m-2 p-2 closeButton"
              onClick={handleClose}
              title="Close"
            ></i>
            <p className="text-center mb-3">{isUpdate ? 'Update Task' : 'Create new Task'}</p>
            <form>
              <div className="mb-3">
                <label htmlFor="task" className="form-label">
                  Task
                </label>
                <input
                  type="text"
                  className={`form-control ${taskError ? 'is-invalid' : ''}`}
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="Eg: Buy groceries"
                  maxLength={50}
                />
                {taskError && <div className="invalid-feedback">Task must be more than 10 characters.</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="deadline" className="form-label">
                  Deadline
                </label>
                <input
                  type="date"
                  className={`form-control ${deadlineError ? 'is-invalid' : ''}`}
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
                {deadlineError && <div className="invalid-feedback">Deadline must be a valid date.</div>}
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-success btn-block" onClick={handleSave}>
                  {isUpdate ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
