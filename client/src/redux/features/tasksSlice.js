import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TasksService from 'services/TasksService';

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

const handleAsyncThunk = async (serviceMethod, payload, rejectWithValue) => {
  const { result, error } = await serviceMethod(payload);
  return result ? result : rejectWithValue(error || 'An error occurred. Please try again later.');
};

export const getTasks = createAsyncThunk('tasks', (_, { rejectWithValue }) =>
  handleAsyncThunk(TasksService.getTasks, undefined, rejectWithValue)
);
export const getTask = createAsyncThunk('tasks/:id', (taskId, { rejectWithValue }) =>
  handleAsyncThunk(TasksService.getTask, taskId, rejectWithValue)
);
export const createTask = createAsyncThunk('tasks/new', (task, { rejectWithValue }) =>
  handleAsyncThunk(TasksService.createTask, task, rejectWithValue)
);
export const editTask = createAsyncThunk('tasks/edit', ({ updatedTask, id }, { rejectWithValue }) =>
  handleAsyncThunk(TasksService.editTask, { updatedTask, id }, rejectWithValue)
);
export const deleteTask = createAsyncThunk('tasks/delete', (id, { rejectWithValue }) =>
  handleAsyncThunk(TasksService.deleteTask, id, rejectWithValue)
);

const sortTasks = (state, compareFn) => {
  state.tasks.sort(compareFn);
};

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
    sortByCreationDate: (state) => sortTasks(state, (a, b) => new Date(b.creationDate) - new Date(a.creationDate)),
    sortByPriority: (state, { payload }) =>
      sortTasks(state, (a, b) => (payload === 0 ? b.priority - a.priority : a.priority - b.priority)),
    sortByDeadline: (state, { payload }) =>
      sortTasks(state, (a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return payload === 0
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }),
  },
  extraReducers: (builder) => {
    const pendingReducer = (state) => {
      state.isLoading = true;
      state.error = null;
    };
    const fulfilledReducer = (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    };
    const rejectedReducer = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      .addCase(getTasks.pending, pendingReducer)
      .addCase(getTasks.fulfilled, fulfilledReducer)
      .addCase(getTasks.rejected, rejectedReducer)
      .addCase(getTask.pending, pendingReducer)
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(getTask.rejected, rejectedReducer)
      .addCase(createTask.pending, pendingReducer)
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(createTask.rejected, rejectedReducer)
      .addCase(editTask.pending, pendingReducer)
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
      })
      .addCase(editTask.rejected, rejectedReducer)
      .addCase(deleteTask.pending, pendingReducer)
      .addCase(deleteTask.fulfilled, fulfilledReducer)
      .addCase(deleteTask.rejected, rejectedReducer);
  },
});

export default tasksSlice.reducer;
export const { actions } = tasksSlice;
