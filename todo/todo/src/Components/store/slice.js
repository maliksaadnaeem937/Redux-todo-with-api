import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItems: [],
  getItemsStatus: "idle",
  addItemStatus:"idle",
  deleteItemStatus:"idle",
  error: null,
};

export const getTodos = createAsyncThunk("todos/get", async () => {
  try {
    const response = await fetch("http://localhost:8000/api/read");

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
});

export const createTodo = createAsyncThunk("todos/post", async (todoName) => {
  console.log("inside create todo thunk ", todoName);
  try {
    const response = await fetch("http://localhost:8000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoName }),
    });
    if (!response.ok) {
      const error = await response.json();

      throw error;
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
});
export const deleteTodo = createAsyncThunk("todos/delete", async (todoId) => {
  console.log("inside delete todo thunk ", todoId);
  try {
    const response = await fetch("http://localhost:8000/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId }),
    });
    if (!response.ok) {
      const error = await response.json();

      throw error;
    }
 
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
});





const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    //get todos
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoItems = action.payload.data;
      state.getItemsStatus = "idle";
    });
  
    builder.addCase(getTodos.rejected, (state, action) => {
      state.getItemsStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getTodos.pending, (state) => {
        state.getItemsStatus = "loading";
      });

//    Ending case for get todos


//add todos
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todoItems.push(action.payload.data);
      state.status = "idle";
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.addItemStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createTodo.pending, (state, action) => {
      state.addItemStatus = "loading";
   
    });

    //  ending case for add todos


    // delete todos
    builder.addCase(deleteTodo.fulfilled, (state,action) => {
      state.deleteItemStatus = "idle";
      state.todoItems=action.payload.data
    
    });
    builder.addCase(deleteTodo.rejected, (state,action) => {
      state.deleteItemStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteTodo.pending, (state,action) => {
      state.deleteItemStatus = "loading";
    });
   
  },
});

export default todoSlice;
