import axios from 'axios';
import { Todo } from '../interface/todo';

const BASE_URL = process.env.VITE_BASE_URL;

/* TO DO: Add an interceptor to Axios instance, 
  can use the axios.interceptors property to register functions that
  will be called for every request and response */

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.post(`${BASE_URL}/todo/add`, todo);
  return response.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${BASE_URL}/todo/update`, todo);
  return response.data;
};

export const markAsDone = async (id: string, isDone: boolean): Promise<Todo> => {
  const response = await axios.patch(`${BASE_URL}/todo/mark-as-done/${id}/${isDone}`);
  return response.data;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${BASE_URL}/todo/list`);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await axios.delete(`${BASE_URL}/todo/delete/${id}`);
  return response.data;
};
