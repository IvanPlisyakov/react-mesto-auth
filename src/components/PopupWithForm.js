import React from 'react';
import PropTypes from 'prop-types';

function PopupWithForm(props) {
  return (
   <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
    <form className="profile-form" name={props.formName} onSubmit={props.onSubmit} noValidate>
      <h2 className="profile-form__title">{props.title}</h2>
      {props.children}
      <button className="profile-form__btn-save" type="submit">{props.buttonSubmitText}</button>
      <button className="profile-form__btn-close" type="reset" onClick={props.onClose}></button>
    </form>
   </section>
  )
}

PopupWithForm.propTypes = {
  formName: PropTypes.string,
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.element,
  buttonSubmitText: PropTypes.func,
}

export default PopupWithForm;