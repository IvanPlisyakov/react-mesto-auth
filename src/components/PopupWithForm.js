import React from 'react';

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

export default PopupWithForm;