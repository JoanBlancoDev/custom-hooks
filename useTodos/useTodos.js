import {useReducer, useEffect} from 'react';
import { todoReducer } from './todoReducer';

const init = () => JSON.parse(localStorage.getItem("todos")) || [];
export const useTodos = (initialState = []) => {


    const [todos, dispatch] = useReducer(todoReducer, initialState, init);


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);

    // Function to add a new TODO
  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);

  };

  // Function to remove only one TODO
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  }

  // Function to check and uncheck a TODO
  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  return{
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount : todos.length,
    pendingTodosCount : todos.filter(todo => !todo.done).length,
  }
}

