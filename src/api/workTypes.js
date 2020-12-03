const apiUrl = '/work-types';

export const getAll = () => {
  return fetch(`${apiUrl}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then((response) =>
      response.status !== 200 ? Promise.reject(response) : response.json()
    )
    .catch((error) => {
      return Promise.reject(error);
    });
};
