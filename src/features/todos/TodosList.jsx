import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, updateTodo } from "./todosSlice";

const TodosList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    // If the todo is in edit mode, save the changes
    if (editMode === todo.id) {
      dispatch(updateTodo({ ...todo, title: editedTitle }));
      setEditMode(null); // Exit edit mode
    } else {
      // Enter edit mode and set the current title
      setEditMode(todo.id);
      setEditedTitle(todo.title);
    }
  };

  const clearAllTodos = () => {
    // Dispatch an action to delete all todos
    items.forEach((todo) => dispatch(deleteTodo(todo.id)));
  };

  const handleToggle = (todo) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            {editMode === todo.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              todo.title
            )}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleEdit(todo)}>
              {editMode === todo.id ? "Save" : "Edit"}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearAllTodos}>Clear All</button>
    </>
  );
};

export default TodosList;
