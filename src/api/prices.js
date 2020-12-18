import request from '../helper/request';

const apiUrl = '/prices';

export const create = (data) => {
  return request
    .post(`${apiUrl}/create`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getAll = () => {
  return request
    .get(`${apiUrl}/all`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
