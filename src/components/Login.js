import React from 'react';
import PropTypes from 'prop-types';
import SignWithForm from './SignWithForm';

function Login(props) {
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
    
    props.handleSubmitLogin({
      password: password,
      email: email,
    });

    clearInputs();
  }
  
  return (
    <section className="login">
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

Login.propTypes = {
  handleSubmitLogin: PropTypes.string,
}

export default Login;