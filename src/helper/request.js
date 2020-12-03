import axios from 'axios';

const request = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export function setToken(token) {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default request;
