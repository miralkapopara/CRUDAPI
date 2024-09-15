import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

// Async thunk for API calls
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${apiUrl}?_limit=10`);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await axios.post(apiUrl, newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const response = await axios.put(
      `${apiUrl}/${updatedTodo.id}`,
      updatedTodo
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    await axios.delete(`${apiUrl}/${todoId}`);
    return todoId;
  }
);



// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add todo
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    // Update todo
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.items.findIndex((todo) => todo.id === updatedTodo.id);

      // Check if the todo exists before updating
      if (index !== -1) {
        state.items[index] = updatedTodo;
      }
    });

    // Delete todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    });
  },
});

export default todosSlice.reducer;
