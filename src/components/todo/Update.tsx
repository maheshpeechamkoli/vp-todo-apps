import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TodoForm from './TodoForm';

function Update() {
  const location = useLocation();
  const todoData = location.state?.todoData || {};
  return (
    <>
      <TodoForm isUpdate todoData={todoData} />;
      <ToastContainer />
    </>
  );
}

export default Update;
