import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:30081',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

export default instance;