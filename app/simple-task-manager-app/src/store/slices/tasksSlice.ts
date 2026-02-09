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

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  try {
    const resp = await apiClient.get('/tasks');
    return resp.data || [];
  } catch (err) {
    return [];
  }
});

export const createTaskRemote = createAsyncThunk('tasks/createRemote', async (task: Task, { dispatch }) => {
  try {
    const payload = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    };
    const resp = await apiClient.post('/tasks', payload);
    await dispatch(fetchTasks());
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
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch tasks';
      })
      .addCase(createTaskRemote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskRemote.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const t = action.payload;
        const exists = state.items.find(i => i.id === t.id);
        if (!exists) state.items.push(t);
      })
      .addCase(createTaskRemote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to create task remotely';
      });
  },
});

export const { addTask, setTasks, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
