import request from '../helper/request';
import axios from 'axios';

export const signin = (data) => {
  return request
    .post(`/signin`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const refreshInitial = () => {
  return axios
    .post(`/api/refresh-token`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
