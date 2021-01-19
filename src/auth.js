export class Auth {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": String(password),
        "email": String(email)
      })
    })
    .then((response) => {
      try {
        if (response.status === 201){
          console.log(232332)
          return response.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": String(password),
        "email": String(email)
      })
    })
    .then((response => response.json()))
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }; 

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }
}

export const auth = new Auth ({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})


/*export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": String(password),
      "email": String(email)
    })
  })
  .then((response) => {
    try {
      if (response.status === 201){
        console.log(232332)
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}; 

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": String(password),
      "email": String(email)
    })
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch((err) => {
    console.log(err)
  })
}; 

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
} */