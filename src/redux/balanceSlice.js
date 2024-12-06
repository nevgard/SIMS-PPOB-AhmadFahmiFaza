import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from '../services/transactionService';

export const topUpBalance = createAsyncThunk(
  'balance/topUp',
  async ({ amount }, { rejectWithValue }) => {
    try {
      return await transactionService.topUp(amount);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState: { balance: 0, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.loading = false;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default balanceSlice.reducer;
