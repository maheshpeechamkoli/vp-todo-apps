import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Add from './components/todo/Add';
import Navbar from './components/navbar/Navbar';
import Update from './components/todo/Update';
import List from './components/todo/List';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
