import { axiosInstance } from './index';

// register new user
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/register', payload);

    // returning the data received from the backend
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// login user
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload);

    // returning the data received from the backend
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};
