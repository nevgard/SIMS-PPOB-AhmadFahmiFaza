import api from './api';

const login = async ({ email, password }) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

const register = async ({ first_name,last_name, email, password }) => {
  const response = await api.post('/registration', { first_name,last_name, email, password });
  return response.data;
};

const authService = { login, register };
export default authService;
