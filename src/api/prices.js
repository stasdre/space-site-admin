import request from '../helper/request';

const apiUrl = '/prices';

export const update = (id, data) => {
  return request
    .put(`${apiUrl}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const massUpdate = (data) => {
  return request
    .put(`${apiUrl}/mass-update`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
