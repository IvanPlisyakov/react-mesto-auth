import React from 'react';
import { Route, Link, Switch, useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import headerLogo from '../images/header-logo.svg';
import buttonMenu from '../images/Header__button-menu.svg';
import buttonClose from '../images/Header__button-close.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(null);
  const [isClassMenuActive, setIsClassMenuActive] = React.useState(null);

  const history = useHistory();
  const currentUser = React.useContext(CurrentUserContext);

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  function handleMenuClick() {
    if(isClassMenuActive === null) {
      setIsClassMenuActive(true)
    } else {
      setIsClassMenuActive(!isClassMenuActive)
    }

    setTimeout(() => {setIsMenuOpen(!isMenuOpen)}, 500); 
  }

  const [screenWidth, setScreenWidth] = React.useState(document.documentElement.clientWidth);

  function handleWindowResize() {
    setScreenWidth(document.documentElement.clientWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const Menu = (
   <div className={`header__menu-overlay ${isClassMenuActive === true && "header__menu-overlay_active" } ${isClassMenuActive === false && "header__menu-overlay_inActive" }`}>
    <div className={`header__menu`}>
      <p className="header__menu-mail">{currentUser.email}</p>
      <button className="header__menu-btn" onClick={signOut}>Выйти</button>
    </div>
  </div> 
  )
 return (
<>  
  <Switch>
    <Route exact path="/">
      {screenWidth < 882 && Menu }
    </Route>
  </Switch>
  <header className="header">
    <div className="header__column">
      <img className="header__logo" src={headerLogo} alt="Логотип Mesto Russia"/>
      <Switch>
        <Route exact path="/">
          <img className={`header__button-menu ${isClassMenuActive === true && "header__button-menu_active"} ${isClassMenuActive === false &&"header__button-menu_inActive"}`} src={isMenuOpen ? buttonClose : buttonMenu } onClick={() => {handleMenuClick()}} alt="Иконка меню"/>
          {screenWidth >= 882 && Menu}
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/signin">Войти</Link>
        </Route>
        <Route path="/signin">
        <Link className="header__link" to="/signup">Регистрация</Link>
        </Route>
      </Switch>
    </div>
  </header>
</>  
 )
}
export default Header;