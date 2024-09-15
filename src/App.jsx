import React from "react";
import TodoForm from "./components/TodoForm";
import TodosList from "./features/todos/TodosList";

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodosList />
    </div>
  );
}

export default App;
