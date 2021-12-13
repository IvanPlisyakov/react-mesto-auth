import React from 'react';
import PropTypes from 'prop-types';
import SignWithForm from './SignWithForm';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.handleSubmitRegister({
      password: password,
      email: email,
    });

    clearInputs();
  }

  return (
    <section className="register">
      <SignWithForm 
        title="Регистрация"   
        formName="register" 
        buttonSubmitText="Зарегистрироваться"
        handleEmailChange={handleEmailChange}
        email={email}
        handlePasswordChange={handlePasswordChange}
        password={password}
        handleSubmit={handleSubmit}
        />
      <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?&ensp;</p>
          <Link to="signin" className="register__login-link">Войти</Link>
      </div>

    </section>
  )
}

Register.propTypes = {
  handleSubmitRegister: PropTypes.func,
}

export default withRouter(Register);