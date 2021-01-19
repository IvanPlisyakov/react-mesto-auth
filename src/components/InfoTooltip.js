import React from 'react';

function InfoTooltip(props) {
  return (
  <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
    <div className="infoTooltip">
      <img className="infoTooltip__image" src={props.image} alt=""/>
      <h2 className="infoTooltip__title">{props.title}</h2>
      <button className="infoTooltip__btn-close" type="reset" onClick={props.onClose}></button>
    </div>
   </section>
  )
}

export default InfoTooltip;


