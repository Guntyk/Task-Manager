import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from 'services/UsersService';

const initialState = {
  users: [],
  error: null,
  isLoading: false,
};

export const getUsers = createAsyncThunk('users', async (_, { rejectWithValue }) => {
  const { result, error } = await UsersService.getUsers();

  if (result) {
    return result;
  }

  return rejectWithValue(error || 'An error occurred while getting users data. Please try again later');
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
