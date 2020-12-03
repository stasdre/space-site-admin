import request from '../helper/request';

export const signin = (data) => {
  return request
    .post(`/signin`, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
};
