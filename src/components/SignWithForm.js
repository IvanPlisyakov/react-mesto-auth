import React from 'react';

function SignWithForm(props) {
  return (
    <form className="sign-form" name={props.formName} onSubmit={props.handleSubmit} noValidate>
      <h2 className="sign-form__title">{props.title}</h2>
      <label className="sign-form__field">
        <input className="sign-form__input sign-form__input_data_mail" id="mail-input" value={props.email} onChange={props.handleEmailChange} type="text" name={props.formName} minLength="2" maxLength="40" required placeholder="Email" />
        <span className="sign-form__input-error" id="mail-input-error"></span>
      </label>
      <label className="sign-form__field">
        <input className="sign-form__input sign-form__input_data_password" id="password-input" value={props.password} onChange={props.handlePasswordChange} type="password" name={props.formName} minLength="2" maxLength="40" required placeholder="Пароль"/>
        <span className="sign-form__input-error" id="password-input-error"></span>
      </label>
      <button className="sign-form__btn-save" type="submit">{props.buttonSubmitText}</button>
    </form>
  )
}

export default SignWithForm;