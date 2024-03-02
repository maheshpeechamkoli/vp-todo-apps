import { useLocation } from 'react-router-dom';
import TodoForm from './TodoForm';

function Update() {
  const location = useLocation();
  const todoData = location.state?.todoData || {};
  return (
    <>
      <TodoForm isUpdate todoData={todoData} />;
    </>
  );
}

export default Update;
