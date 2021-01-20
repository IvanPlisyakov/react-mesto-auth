import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import {auth} from '../utils/api.js';

import InfoTooltip from './InfoTooltip';
import InfoTooltipImageOk from '../images/InfoTooltip_ok.svg'
import InfoTooltipImageBadly from '../images/InfoTooltip_badly.svg'

//import InfoTooltip from './InfoTooltip';
//import InfoTooltip_badly from '../images/InfoTooltip_badly.svg'
//import { HandlePopupClose } from '../utils/HandlePopupClose.js'
//import {CardsContext} from './CardsContext.js'

function App() {
  function sendStandartCatch(err) {
    console.log(err); 
    alert("Что-то пошло не так.")
  }

  function sendStandartCurrentUserThen(data) {
    setCurrentUser(data);
    closeAllPopups();
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isOpenCardPopupOpen, setIsOpenCardPopupOpen] = React.useState(false);
  const [isOpenInfoTooltipOpen, setIsOpenInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(""); 

  const [currentUser, setCurrentUser] = React.useState({});

  const [infoTooltipImage, setInfoTooltipImage] = React.useState("");
  const [infoTooltipText, setInfoTooltipText] = React.useState("");


  const history = useHistory();

  function handleLogin() {
    setLoggedIn(true)
  }

  React.useEffect(() => {
    api.getInitialProfile()
      .then(setCurrentUser)
      .catch(sendStandartCatch);
    tokenCheck();
  }, []); 

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          setUserEmail(res.data.email)
          setLoggedIn(true);
          history.push('/');
        })
    } else {
      setLoggedIn(false);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenCardPopupOpen(!isOpenCardPopupOpen);
  }

  function handleInfoTooltipOkOpen() {
    setIsOpenInfoTooltipOpen(!isOpenInfoTooltipOpen)
    setInfoTooltipImage(InfoTooltipImageOk)
    setInfoTooltipText("Вы успешно зарегистрировались!")
  }

  function handleInfoTooltipBadlyOpen() {
    setIsOpenInfoTooltipOpen(!isOpenInfoTooltipOpen)
    setInfoTooltipImage(InfoTooltipImageBadly)
    setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.")
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenCardPopupOpen(false);
    setIsOpenInfoTooltipOpen(false)
    setSelectedCard({});
  }

  function handleUpdateAvatar(avatarData) {
    api.changeAvatarProfile(avatarData.avatar)
      .then((data) => { sendStandartCurrentUserThen(data); })
      .catch((err) => { sendStandartCatch(err); });
  }

  function handleUpdateUser(profileData) {
    api.changeProfile(profileData.name, profileData.about)
      .then((data) => { sendStandartCurrentUserThen(data); })
      .catch((err) => { sendStandartCatch(err); });
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData.title, cardData.link)
      .then((card) => { 
        setCards([card, ...cards]);
        closeAllPopups();
       })
      .catch((err) => { sendStandartCatch(err); });
  }

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => { sendStandartCatch(err); });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => { sendStandartCatch(err); });
  } 

  function handleCardDelete(card){
    api.deleteItem(card._id)
      .then((data) => {
        const newCards = cards.filter(function(c) {
          return c._id !== card._id
        });
        setCards(newCards);
      })
      .catch((err) => { sendStandartCatch(err); });
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail}/>
          <Switch>
            <ProtectedRoute exact 
              path="/"
              onCardClick={handleCardClick}  
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              component={Main}
            />
            <Route path="/signup">
              <Register 
                handleInfoTooltipOkOpen={handleInfoTooltipOkOpen}
                handleInfoTooltipBadlyOpen={handleInfoTooltipBadlyOpen}
              />
            </Route>
            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                handleInfoTooltipOkOpen={handleInfoTooltipOkOpen}
                handleInfoTooltipBadlyOpen={handleInfoTooltipBadlyOpen}
              />
            </Route>
            <Route exact path="/"> 
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />
          
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      
          <ImagePopup card={selectedCard} isOpen={isOpenCardPopupOpen} onClose={closeAllPopups}/> 
          <InfoTooltip
            isOpen={isOpenInfoTooltipOpen}
            onClose={closeAllPopups}
            image={infoTooltipImage}
            title={infoTooltipText}
          /> 
        </div>
    </CurrentUserContext.Provider >
  );
}

export default App;

/*
              <Login
                handleLogin={handleLogin}
                handleInfoTooltipOkOpen={handleInfoTooltipOkOpen}
                handleInfoTooltipBadlyOpen={handleInfoTooltipBadlyOpen}
              />
          <InfoTooltip
            isOpen={isOpenInfoTooltipOkOpen}
            onClose={closeAllPopups}
            name={"InfoTooltip-ok"}
            image={InfoTooltipOk}
            title={"Вы успешно зарегистрировались!"}
          /> 
          <InfoTooltip
            isOpen={isOpenInfoTooltipBadlyOpen}
            onClose={closeAllPopups}
            name={"InfoTooltip-badly"}
            image={InfoTooltipBadly}
            title={"Что-то пошло не так! Попробуйте ещё раз."}
         /> 


 



<PopupWithForm children={EditAvatarPopupChildren} isOpen={isEditAvatarPopupOpen} name="avatar-сhange" title="Обновить аватар" buttonSubmitText="Соханить" onClose={closeAllPopups} />
<PopupWithForm children={EditProfilePopupChildren} isOpen={isEditProfilePopupOpen} name="profile-сhange" title="Редактировать профиль" buttonSubmitText="Соханить" onClose={closeAllPopups} />
          <PopupWithForm children={AddPlacePopupChildren} isOpen={isAddPlacePopupOpen} name="adding-a-picture" title="Новое место" buttonSubmitText="Соханить" onClose={closeAllPopups} />














      <section className="popup form form_new-avatar">
        <form className="profile-form" name="avatar-сhange" noValidate>
          <h2 className="profile-form__title">Обновить аватар</h2>
          <label className="profile-form__field">
            <input className="profile-form__user profile-form__user_data_info" id="avatar-input" type="url" name="adding-a-picture" placeholder="Ссылка на аватар" required/>
            <span className="profile-form__user-error" id="avatar-input-error"></span>
          </label>
          <button className="profile-form__btn-save" type="submit">Сохранить</button>
          <button className="profile-form__btn-close" type="reset"></button>
        </form>
      </section>
      <section className="popup form form_edit-button">
        <form className="profile-form" name="profile-сhange" noValidate>
          <h2 className="profile-form__title">Редактировать профиль</h2>
          <label className="profile-form__field">
            <input className="profile-form__user profile-form__user_data_name" id="name-input" type="text" name="profile-сhange" minLength="2" maxLength="40" required/>
            <span className="profile-form__user-error" id="name-input-error">fygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygii</span>
          </label>
          <label className="profile-form__field">
            <input className="profile-form__user profile-form__user_data_info" id="info-input" type="text" name="profile-сhange" minLength="2" maxLength="200" required/>
            <span className="profile-form__user-error" id="info-input-error">f ygiigfygiifygiigf ygiifygiigfyg iifygiigfy giifyg iifygiigfygii fygiigfygiifyg iigfygiifygiig fygiifygii</span>
          </label>
          <button className="profile-form__btn-save" type="submit">Сохранить</button>
          <button className="profile-form__btn-close" type="reset"></button>
        </form>
      </section>
      <section className="popup form form_add-button">
        <form className="profile-form" name="adding-a-picture" noValidate>
          <h2 className="profile-form__title">Новое место</h2>
          <label className="profile-form__field">
            <input className="profile-form__user profile-form__user_data_name" id="title-input" type="text" name="adding-a-picture" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="profile-form__user-error" id="title-input-error"></span>
          </label>
          <label className="profile-form__field">
            <input className="profile-form__user profile-form__user_data_info" id="link-input" type="url" name="adding-a-picture" placeholder="Ссылка на картинку" required/>
            <span className="profile-form__user-error" id="link-input-error"></span>
          </label>
          <button className="profile-form__btn-save" type="submit">Сохранить</button>
          <button className="profile-form__btn-close" type="reset"></button>
        </form>
      </section>
      <section className="popup form form_delete-popup">
        <form className="profile-form" noValidate>
          <h2 className="profile-form__title profile-form__title_delete-popup">Вы уверены?</h2>
          <button className="profile-form__btn-save" type="submit">Да</button>
          <button className="profile-form__btn-close" type="reset"></button>
        </form>
      </section>
      <template id="card">
        <div className="element">
          <div className="element__overlay">
            <img className="element__image" src="images/element-rnb_club.jpg" alt=""/>
          </div>
          <button className="element__btn-delete element__btn-delete_inactive" type="button">
            <img className="element__img-cap" src="images/element__img-cap.svg" alt=""/>
            <img className="element__img-urn" src="images/element__img-urn.svg" alt=""/>
          </button>
          <div className="element__column">
            <h4 className="element__title"></h4>
            <div className="element__column-like">
              <button className="element__btn-like" type="button"></button>
              <p className="element__number-like">15252</p>
            </div>
          </div>
        </div>
      </template>



        <div className="popup picture-opening">
          <div className="picture-opening__box">
            <img className="picture-opening__img" src="images/picture-opening_ERROR.jpg" alt=""/>
            <p className="picture-opening__title"></p>
            <button className="profile-form__btn-close" type="reset"></button>
          </div>
        </div>
*/
