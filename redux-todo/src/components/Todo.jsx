import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todos/todoSlice";
import './Todo.css'

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="todo-container">
      <h1 className="todo-title">List of Todos</h1>

      {todos.length === 0 ? (
        <p className="empty-text">No todos added</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
