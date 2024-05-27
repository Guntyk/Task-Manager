import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasksSlice';
import usersSlice from './features/usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
