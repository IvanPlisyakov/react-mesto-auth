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
    return fetch(`${this._baseUrl}/cards`, {//карточки
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {return this._sendStandartThen(res);})
      //.catch((err) => {this._sendStandartCatch(err)});
  }
  
  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {//данные профиля
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {return this._sendStandartThen(res);})
      //.catch((err) => {this._sendStandartCatch(err)});
  }

  changeProfile(nameInput, infoInput) {
    this._renderLoading(true, this.editFormName)
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: infoInput
      })
    }) 
    
      .then((res) => {return this._sendStandartThen(res);})
      //.catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, this.editFormName)
      });
  }

  addCard( name, link) {
    this._renderLoading(true, this.addFormName)
    return fetch(`${this._baseUrl}/cards`, {//делаем запрос, что мы добавили новую карточку
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return this.getInitialCards();//res.json();
       }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      //.catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, this.addFormName)
      });
  }


  addLikeItem(idItem) {
    return fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {return this._sendStandartThen(res);})
      //.then((data) => {console.log(data)})
     // .catch((err) => {this._sendStandartCatch(err)})
  }

  removeLikeItem(idItem) {
    return fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {return this._sendStandartThen(res);})
      //.catch((err) => {this._sendStandartCatch(err)})
  }

  changeLikeCardStatus(idItem, likeStatus){
    if(likeStatus) {
      return this.addLikeItem(idItem)
    } else {
      return this.removeLikeItem(idItem)
    }
  }

  deleteItem(idItem) {
    return fetch(`${this._baseUrl}/cards/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {return this._sendStandartThen(res);})
      //.catch((err) => {this._sendStandartCatch(err)})
  }

  changeAvatarProfile(link) {
    this._renderLoading(true, this.avatarFormName)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => {return this._sendStandartThen(res);})
      .finally(() => {
        this._renderLoading(false, this.avatarFormName)
      });
  }

  _renderLoading(isLoading, popupSelector) {
    if(isLoading) {
      document.querySelector(`form[name=${popupSelector}]`).querySelector('.profile-form__btn-save').textContent = "Сохранение..."
    } else {
      document.querySelector(`form[name=${popupSelector}]`).querySelector('.profile-form__btn-save').textContent = "Сохранить"
    }
  }
}

export const api = new Api( {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '12ba02f1-21d1-4be5-b67c-2a240b5b5b87',
    'Content-Type': 'application/json'
  }
}); 

