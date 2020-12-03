import request from '../helper/request';

const apiUrl = '/work-types';

export const getAll = () => {
  return request
    .get(`${apiUrl}/all`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
