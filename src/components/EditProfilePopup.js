import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
//import {EditProfilePopupChildren} from '../utils/constants.js';
function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = React.useState('');
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 
  
  const EditProfilePopupChildren = (
  <>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_name" id="name-input" value={name} onChange={handleChangeName} type="text" name="profile-сhange" minLength="2" maxLength="40" required/>
      <span className="profile-form__user-error" id="name-input-error"></span>
    </label>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_info" id="info-input" value={description} onChange={handleChangeDescription} type="text" name="profile-сhange" minLength="2" maxLength="200" required/>
      <span className="profile-form__user-error" id="info-input-error"></span>
    </label>
  </>
  )

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      children={EditProfilePopupChildren}
      onSubmit={handleSubmit}
      formName="profile-сhange" 
      title="Редактировать профиль" 
      buttonSubmitText="Соханить" 
      onClose={props.onClose}
    />
   )
}

export default EditProfilePopup;
 