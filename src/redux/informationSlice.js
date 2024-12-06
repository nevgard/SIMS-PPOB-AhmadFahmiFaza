import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import informationService from '../services/informationService';

// Thunk untuk mengambil data services
export const fetchServices = createAsyncThunk(
  'information/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      return await informationService.getServices();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

// Thunk untuk mengambil data banner
export const fetchBanner = createAsyncThunk(
  'information/fetchBanner',
  async (_, { rejectWithValue }) => {
    try {
      return await informationService.getBanner();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch banner');
    }
  }
);

const informationSlice = createSlice({
  name: 'information',
  initialState: {
    services: [],
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchServices
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Handle fetchBanner
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default informationSlice.reducer;
