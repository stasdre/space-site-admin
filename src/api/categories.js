import request from '../helper/request';

const apiUrl = '/categories';

export const getAll = (lang) => {
  return request
    .get(`${apiUrl}/${lang}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
