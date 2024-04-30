import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TasksService from 'services/TasksService';

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

const generateTaskObject = (data) => ({
  title: data,
});

export const getTasks = createAsyncThunk('tasks', async (_, { rejectWithValue }) => {
  const { result, error } = await TasksService.getTasks();

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting tasks data. Please try again later');
});

export const createTask = createAsyncThunk('tasks/new', async ({ title }, { rejectWithValue }) => {
  const { result, error } = await TasksService.createTask(generateTaskObject(title));

  console.log(result);
  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while creating a task. Please try again later');
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  const { result, error } = await TasksService.deleteTask(id);

  console.log(result);
  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while deleting a task. Please try again later');
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: (state) => {
      state.tasks = [];
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = [];
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = [];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = [];
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
export const { actions } = tasksSlice;