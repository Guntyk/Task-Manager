import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TasksService from 'services/TasksService';

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

export const getTasks = createAsyncThunk('tasks', async (_, { rejectWithValue }) => {
  const { result, error } = await TasksService.getTasks();

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting tasks data. Please try again later');
});

export const getTask = createAsyncThunk('tasks/:id', async (taskId, { rejectWithValue }) => {
  const { result, error } = await TasksService.getTask(taskId);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting task data. Please try again later');
});

export const createTask = createAsyncThunk('tasks/new', async (task, { rejectWithValue }) => {
  const { result, error } = await TasksService.createTask(task);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while creating a task. Please try again later');
});

export const editTask = createAsyncThunk('tasks/edit', async ({ updatedTask, id }, { rejectWithValue }) => {
  const { result, error } = await TasksService.editTask(updatedTask, id);

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while editing a task. Please try again later');
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  const { result, error } = await TasksService.deleteTask(id);

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
    sortByCreationDate: (state) => {
      state.tasks.sort((a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
      });
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
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = [];
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [action.payload, ...state.tasks];
        state.error = [];
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
        state.error = [];
      })
      .addCase(editTask.rejected, (state, action) => {
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
