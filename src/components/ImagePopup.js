import React from 'react';
import PropTypes from 'prop-types';

function ImagePopup(props) {
  return (
    <div className={`popup picture-opening ${props.isOpen && 'popup_opened'}`}>
      <div className="picture-opening__box">
        <img className="picture-opening__img" src={props && props.card.link} alt={props.card.name}/>
        <p className="picture-opening__title">{props.card.name}</p>
        <button className="profile-form__btn-close" type="reset" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

ImagePopup.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  card: PropTypes.object,
}

export default ImagePopup;