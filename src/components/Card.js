import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
//import {api} from '../utils/Api.js';

import imgButtonDeleteCap from '../images/element__img-cap.svg';
import imgButtonDeleteUrn from '../images/element__img-urn.svg'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
  <div className="element">
    <div className="element__overlay">
      <img className="element__image" src={props.card.link} onClick={handleClick} alt=""/>
    </div>
    <button className={`element__btn-delete ${!isOwn && 'element__btn-delete_inactive'}`} type="button" onClick={handleDeleteClick}>
      <img className="element__img-cap" src={imgButtonDeleteCap} alt=""/>
      <img className="element__img-urn" src={imgButtonDeleteUrn} alt=""/>
    </button>
    <div className="element__column">
      <h4 className="element__title">{props.card.name}</h4>
      <div className="element__column-like">
        <button className={`element__btn-like ${props.card.likes.some(i => i._id === currentUser._id) && 'element__btn-like_active'}`} type="button" onClick={handleLikeClick}></button>
        <p className="element__number-like">{props.card.likes.length}</p>
      </div>
    </div>
  </div>
  )
}
export default Card;