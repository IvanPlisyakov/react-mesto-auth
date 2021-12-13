import React from 'react';
import PropTypes from 'prop-types';

function InfoTooltip(props) {
  return (
  <section className={`popup ${props.isOpen && 'popup_opened'}`}>
    <div className="infoTooltip">
      <img className="infoTooltip__image" src={props.image} alt="Картинка с результатом Вашей авторизации"/>
      <h2 className="infoTooltip__title">{props.title}</h2>
      <button className="infoTooltip__btn-close" type="reset" onClick={props.onClose}></button>
    </div>
   </section>
  )
}

InfoTooltip.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.func,
}

export default InfoTooltip;


