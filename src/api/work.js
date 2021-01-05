import request from '../helper/request';

const apiUrl = '/works';

export const create = (data) => {
  delete data.images;
  return request
    .post(`${apiUrl}/create`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getAll = () => {
  return request
    .get(`${apiUrl}/`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const deleteWork = (id) => {
  return request
    .delete(`${apiUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getById = (id) => {
  return request
    .get(`${apiUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const update = (id, data) => {
  return request
    .put(`${apiUrl}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
