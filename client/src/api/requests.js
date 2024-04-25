import axios from 'axios';

console.log(process.env.REACT_APP_BASE_API_URL);

export const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);

export const getUsers = () => backendApi.get('/users');
