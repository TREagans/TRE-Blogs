import { axiosInstance } from './index';

// register new user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/register', payload);

    // returning the data received from the backend
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// login user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload);

    // returning the data received from the backend
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// get user details from token
export const GetUser = async () => {
  try {
    const response = await axiosInstance.get('/api/users/getuser');

    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
}
