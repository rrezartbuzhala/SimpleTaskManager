import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../services/apiClient';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error?: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

export const createTaskRemote = createAsyncThunk('tasks/createRemote', async (task: Task) => {
  try {
    const payload = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    };
    const resp = await apiClient.post('/tasks', payload, { validateStatus: () => true });
    return resp.data || task;
  } catch (err) {
    return task;
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.items.push(action.payload);
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskRemote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskRemote.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const t = action.payload;
        // If server returned same id, avoid duplication
        const exists = state.items.find(i => i.id === t.id);
        if (!exists) state.items.push(t);
      })
      .addCase(createTaskRemote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to create task remotely';
      });
  },
});

export const { addTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
