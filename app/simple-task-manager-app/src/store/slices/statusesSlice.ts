import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStatuses } from '../../services/metadataService';

interface StatusesState {
  items: string[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusesState = {
  items: [],
  loading: false,
  error: null,
};

export const getStatuses = createAsyncThunk(
  'statuses/getStatuses',
  async () => {
    return await fetchStatuses();
  }
);

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch statuses';
      });
  },
});

export default statusesSlice.reducer;
