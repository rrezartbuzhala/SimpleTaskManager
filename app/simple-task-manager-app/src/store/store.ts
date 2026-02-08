import { configureStore } from '@reduxjs/toolkit';
import prioritiesReducer from './slices/prioritiesSlice';
import statusesReducer from './slices/statusesSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    priorities: prioritiesReducer,
    statuses: statusesReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
