const apiUrl = '/services';

export const create = (data) => {
  return fetch(`${apiUrl}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.status !== 200 ? Promise.reject(response) : response.json()
    )
    .catch((error) => {
      return Promise.reject(error);
    });
};

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
