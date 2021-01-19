import React from 'react';
import SignWithForm from './SignWithForm';
import { Link, withRouter, useHistory } from 'react-router-dom';
import {auth} from '../auth.js';

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  const history = useHistory();
  function handleSubmit(e){
    e.preventDefault()
    auth.authorize(password, email)
      .then((data) => {
        if(!data) {
          props.handleInfoTooltipBadlyOpen();
        }
        if(data.token) {
          props.handleInfoTooltipOkOpen();
          props.handleLogin();
          clearInputs();
          history.push('/')
        }
      })
      .catch((err) => {console.log(err)})
  }
  return (
    <section class="login">
      <SignWithForm 
        title="Вход" 
        formName="login" 
        buttonSubmitText="Войти"
        handleEmailChange={handleEmailChange}
        email={email}
        handlePasswordChange={handlePasswordChange}
        password={password}
        handleSubmit={handleSubmit}
        />
        
    </section>
  )
}

export default Login;