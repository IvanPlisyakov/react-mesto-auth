export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;

    this.editFormName = 'profile-сhange';
    this.addFormName = 'adding-a-picture';
    this.avatarFormName = 'avatar-сhange';
  }

  _sendStandartThen(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _sendStandartCatch(err) {
    console.log(err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { // карточки
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => this._sendStandartThen(res));
    // .catch((err) => {this._sendStandartCatch(err)});
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, { // данные профиля
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => this._sendStandartThen(res));
    // .catch((err) => {this._sendStandartCatch(err)});
  }

  changeProfile(nameInput, infoInput) {
    this._renderLoading(true, this.editFormName);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: nameInput,
        about: infoInput,
      }),
    })

      .then((res) => this._sendStandartThen(res))
      // .catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, this.editFormName);
      });
  }

  addCard(name, link) {
    this._renderLoading(true, this.addFormName);
    return fetch(`${this._baseUrl}/cards`, { // делаем запрос, что мы добавили новую карточку
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      // .catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, this.addFormName);
      });
  }

  addLikeItem(idItem) {
    return fetch(`${this._baseUrl}/cards/${idItem}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => this._sendStandartThen(res));
    // .then((data) => {console.log(data)})
    // .catch((err) => {this._sendStandartCatch(err)})
  }

  removeLikeItem(idItem) {
    return fetch(`${this._baseUrl}/cards/${idItem}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => this._sendStandartThen(res));
    // .catch((err) => {this._sendStandartCatch(err)})
  }

  changeLikeCardStatus(idItem, likeStatus) {
    if (likeStatus) {
      return this.addLikeItem(idItem);
    }
    return this.removeLikeItem(idItem);
  }

  deleteItem(idItem) {
    return fetch(`${this._baseUrl}/cards/${idItem}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => this._sendStandartThen(res));
    // .catch((err) => {this._sendStandartCatch(err)})
  }

  changeAvatarProfile(link) {
    this._renderLoading(true, this.avatarFormName);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => this._sendStandartThen(res))
      .finally(() => {
        this._renderLoading(false, this.avatarFormName);
      });
  }

  _renderLoading(isLoading, popupSelector) {
    if (isLoading) {
      document.querySelector(`form[name=${popupSelector}]`).querySelector('.profile-form__btn-save').textContent = 'Сохранение...';
    } else {
      document.querySelector(`form[name=${popupSelector}]`).querySelector('.profile-form__btn-save').textContent = 'Сохранить';
    }
  }
}

export const api = new Api({
  baseUrl: 'https://express-mesto.vercel.app',// 'https://api.spora.students.nomoredomains.monster', // 'http://localhost:3000',//'http://motherShaker.students.nomoredomains.monster',//'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

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
        password: String(password),
        email: String(email),
      }),
    })
      .then((response) => {
        try {
          if (response.status === 201) {
            return response.json();
          }
        } catch (e) {
          return (e);
        }
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: String(password),
        email: String(email),
      }),
    })
      .then(((response) => response.json()))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  }
}

export const auth = new Auth({
  baseUrl: 'https://express-mesto.vercel.app', //'http://localhost:3001', //'https://api.spora.students.nomoredomains.monster', // 'http://localhost:3000',//'http://motherShaker.students.nomoredomains.monster',//'https://auth.nomoreparties.co',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
