import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export function setToken(token) {
  request.defaults.accessToken = token;
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url.includes('/refresh-token')) {
      window.location = '/admin/login';
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return request.post('/refresh-token').then((res) => {
        if (res.status === 201) {
          const { accessToken } = res.data;
          originalRequest.accessToken = accessToken;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          request.defaults.accessToken = accessToken;
          request.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

          return request(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default request;
