import axios from 'axios';

// creating an instance of Axios that
// we'll use throughout our application
export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});