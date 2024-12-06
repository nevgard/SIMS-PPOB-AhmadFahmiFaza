import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../services/profileService';

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await profileService.getProfile();
    } catch (error) {
      const message = error.response?.data || "Terjadi kesalahan";
      return rejectWithValue(message);
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      return await profileService.updateProfile(profileData);
    } catch (error) {
      const message = error.response?.data || "Gagal memperbarui profil";
      return rejectWithValue(message);
    }
  }
);

// Update Profile Image
export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (file, { rejectWithValue }) => {
    try {
      return await profileService.updateProfileImage(file);
    } catch (error) {
      const message = error.response?.data || "Gagal memperbarui gambar profil";
      return rejectWithValue(message);
    }
  }
);


// Profile Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: null, loading: false, error: null, updateSuccess: false, updateImageSuccess: false },
  reducers: {
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    clearUpdateImageSuccess(state) {
      state.updateImageSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.updateSuccess = false;
      })

      // Update Profile Image
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateImageSuccess = false;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.data = { ...state.data, profile_image: action.payload.profile_image };
        state.loading = false;
        state.updateImageSuccess = true;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.updateImageSuccess = false;
      })
  },
});

export const { clearUpdateSuccess, clearUpdateImageSuccess } = profileSlice.actions;

export default profileSlice.reducer;
