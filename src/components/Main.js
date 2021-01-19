import React from 'react';
import Card from './Card';
//import {api} from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
//import {CardsContext} from './CardsContext.js'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
     <main className="main">
      <section className="profile">
        <div className="profile__overlay">
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser ? currentUser.avatar : "https://i.gifer.com/g0R5.gif"} alt="Аватар вашей страницы"/>
            <div className="profile__avatar-icon"></div>
          </button>
        </div>
        <div className="profile__column">
          <div className="profile__info">
            <h1 className="profile__user-name">{currentUser ? currentUser.name : ""}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__user-info">{currentUser ? currentUser.about : ""}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </div>
      </section>
      <section className="elements">
      {props.cards && props.cards.map((card) => {     
          return (<Card onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} card={card} key={card._id} />)
        })}
      </section>
    </main>
 )
}
export default Main;