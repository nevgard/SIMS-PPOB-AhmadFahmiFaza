import api from './api';

const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data.data;
  } catch (error) {
    console.error("Error saat get Services:", error);
    throw error;
  }
};

const getBanner = async () => {
  try {
    const response = await api.get('/banner')
    return response.data.data;
  } catch (error) {
    console.error('Error saat get Banner', error)
  }
}

const informationService = { getServices, getBanner };
export default informationService;
