import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo, clearTodo } from "../features/todos/todoSlice";
import "./Todo.css";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    dispatch(updateTodo({ id, text: editText }));
    setEditId(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">Todo :</h1>

        {todos.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => dispatch(clearTodo())}
            title="Delete all todos"
          >
            🗑️
          </button>
        )}
      </div>

      {todos.length === 0 ? (
        <p className="empty-text">No todos added</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editId === todo.id ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    autoFocus
                  />

                  <button
                    className="save-btn"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
               <>
  <span className="todo-text">{todo.text}</span>

  <button
    className="edit-btn"
    onClick={() => startEdit(todo)}
  >
    ✏️
  </button>

  <button
    className="delete-btn"
    onClick={() => dispatch(removeTodo(todo.id))}
  >
    X
  </button>
</>

              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
