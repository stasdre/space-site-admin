import request from '../helper/request';

const apiUrl = '/services';

export const create = (data) => {
  return request
    .post(`${apiUrl}/create`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getByLang = (lang) => {
  return request
    .get(`${apiUrl}/lang/${lang}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getById = (id) => {
  return request
    .get(`${apiUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const getAll = () => {
  return request
    .get(`${apiUrl}/`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const update = (id, data) => {
  return request
    .put(`${apiUrl}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const deleteService = (id) => {
  return request
    .delete(`${apiUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};

export const upload = (file, oldFile = null) => {
  let fd = new FormData();
  fd.append('file', file);
  fd.append('oldFile', oldFile);
  return request
    .post(`${apiUrl}/upload/`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
