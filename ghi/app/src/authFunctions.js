export async function login(username, password) {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/login/`;

  const form = new FormData();
  form.append("username", username);
  form.append("password", password);

  const response = await fetch(url, {
    method: "post",
    credentials: "include",
    body: form,
  });
  if (response.ok) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/mine/`;

    try {
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log(token)
        // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT
        // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
      }
    } catch (e) {}
    return false;
  }
  let error = await response.json();
  console.error(error)
  // DO SOMETHING WITH THE ERROR, IF YOU WANT
}

export async function getCurrentUser() {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;

  const response = await fetch(url, {
    credentials: "include"
  })

  if (response.ok) {
    const userObject = await response.json()
    console.log(userObject);
  }
}

export async function logout() {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/token/refresh/logout/`;

  const response = await fetch(url, {
    method: "delete",
    credentials: "include"
  })

  if (response.ok) {
    const data = await response.json()
    console.log(data);
  } else {
    console.log(response)
  }
}