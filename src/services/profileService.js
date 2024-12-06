import api from './api';

const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data.data;
  } catch (error) {
    console.error("Error di profileService (getProfile):", error);
    throw error;
  }
};

const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/profile/update', profileData);
    return response.data.data;
  } catch (error) {
    console.error("Error di profileService (updateProfile):", error);
    throw error;
  }
};

const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.put('/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;  
  } catch (error) {
    console.error("Error di profileService (updateProfileImage):", error);
    throw error;
  }
};


const profileService = { getProfile, updateProfile, updateProfileImage };
export default profileService;
