import axios from 'axios';

// here we'll create an instance of Axios 
// that we'll use throughout our application
// NOTE: baseURL will come from proxy in package.json
export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})