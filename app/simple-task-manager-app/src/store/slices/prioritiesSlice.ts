import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPriorities } from '../../services/metadataService';

interface PrioritiesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PrioritiesState = {
  items: [],
  loading: false,
  error: null,
};

export const getPriorities = createAsyncThunk(
  'priorities/getPriorities',
  async () => {
    return await fetchPriorities();
  }
);

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPriorities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPriorities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getPriorities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch priorities';
      });
  },
});

export default prioritiesSlice.reducer;
