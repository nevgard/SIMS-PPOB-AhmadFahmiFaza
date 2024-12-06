import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "../services/transactionService";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const transactions = await transactionService.getTransactions(limit, offset);
      return transactions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

export const topUp = createAsyncThunk(
  "transactions/topUp",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await transactionService.topUp(amount);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to top up"
      );
    }
  }
);

export const makePayment = createAsyncThunk(
  "transactions/makePayment",
  async ({ service_code, total_amount }, { rejectWithValue }) => {
    try {
      const response = await transactionService.makePayment(
        service_code,
        total_amount
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to make payment"
      );
    }
  }
);

export const getBalance = createAsyncThunk(
  "transactions/getBalance",
  async (_, { rejectWithValue }) => {
    try {
      const balance = await transactionService.getBalance();
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return rejectWithValue(error.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    balance: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
