import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/List.css';
import { useEffect, useState } from 'react';
import { Todo } from '../../interface/todo';
import { deleteTodo, getAllTodos, markAsDone } from '../../services/todo-service';
import noItemsFoundImage from '../../assets/images/nodata.png';

function List() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);

  const pendingTasks = todos.filter((todo) => !todo.isDone);
  const completedTasks = todos.filter((todo) => todo.isDone);

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllTodos();
        setTodos(result);
      } catch (error) {
        toast.error('Failed to fetch todos.');
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        await deleteTodo(id);
        toast.success('Todo deleted successfully.');
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } catch (error) {
        toast.error('Failed to delete todo.');
      }
    }
  };

  const handleMarkAsDone = async (id: string, isDone: boolean) => {
    try {
      await markAsDone(id, isDone);
      toast.success(`Todo updated successfully.`);
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: isDone } : todo)));
    } catch (error) {
      toast.error('Failed to updated');
      console.error(error);
    }
  };

  const renderTasks = (tasks: Todo[], doneStatus: boolean) => {
    let heading = '';
    if (tasks.length > 0) {
      heading = doneStatus ? 'Completed' : 'Your Tasks';
    }
    return (
      <>
        <div className="text-head">{heading}</div>
        <div className="tasks-list">
          {tasks.map((todo) => (
            <div key={todo.id} className="task-item">
              <div className="col checkbox-column">
                <input
                  type="checkbox"
                  checked={todo.isDone || false}
                  onChange={(e) => handleMarkAsDone(todo.id!, e.target.checked)}
                />
              </div>
              <div className="col">
                <span
                  className={
                    new Date(todo.deadline!) < new Date(new Date().toISOString().slice(0, 10)) && !todo.isDone
                      ? 'overdue'
                      : ''
                  }
                >
                  {todo.task}
                </span>
                <div className="col task-time">
                  {todo.deadline
                    ? new Date(todo.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''}
                </div>
              </div>

              <div className="col">
                <i
                  onClick={() => navigate(`/update`, { state: { todoData: todo } })}
                  className="fas fa-edit mx-2 text-success cursorPointer"
                  title="Edit"
                  aria-label={`Edit ${todo.task}`}
                ></i>
                <i
                  onClick={() => handleDelete(todo.id!)}
                  className="fas fa-trash-alt mx-2 text-danger cursorPointer"
                  title="Delete"
                  aria-label={`Delete ${todo.task}`}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container mt-5 px-5">
      <Link to="/add" className="btn btn-primary mb-1">
        Add +
      </Link>
      {todos.length === 0 ? (
        <div className="d-flex flex-column align-items-center mb-3">
          <img src={noItemsFoundImage} alt="No items found" className="imgNoData" />
          <p className="text-muted">Whoops! No data found.</p>
        </div>
      ) : (
        <>
          {renderTasks(pendingTasks, false)}
          {renderTasks(completedTasks, true)}
        </>
      )}
    </div>
  );
}

export default List;
