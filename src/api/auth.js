const apiUrl = '';

export const signin = (email, password) => {
  const user = {
    email,
    password,
  };

  return fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
    .then((response) =>
      response.status !== 200 ? Promise.reject(response) : response.json()
    )
    .catch((error) => {
      //console.log(error);
      return error.json();
    });
};
