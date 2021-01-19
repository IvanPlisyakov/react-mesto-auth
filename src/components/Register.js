import React from 'react';
import SignWithForm from './SignWithForm';
import { Link, withRouter, useHistory } from 'react-router-dom';
import {auth} from '../auth.js';


function Register(props) {
  //const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  //const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const history = useHistory();
  function handleSubmit(e){
    e.preventDefault()
    auth.register(password, email)
      .then((res) => {
        if(res){
          props.handleInfoTooltipOkOpen();
          history.push('/signin');
        } else {
          props.handleInfoTooltipBadlyOpen();
        }
      });
  }
  return (
    <section class="register">
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

export default withRouter(Register);