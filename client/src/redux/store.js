import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export default store;
