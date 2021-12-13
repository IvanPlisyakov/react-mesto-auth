import React from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

function EditAvatarPopup(props) {
  const inputRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      formName="avatar-сhange" 
      title="Обновить аватар"
      buttonSubmitText="Соханить"
      onClose={props.onClose}
    >
      <label className="profile-form__field">
        <input className="profile-form__user profile-form__user_data_info" id="avatar-input" ref={inputRef} type="url" name="adding-a-picture" placeholder="Ссылка на аватар" required/>
        <span className="profile-form__user-error" id="avatar-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

EditAvatarPopup.propTypes = {
  onUpdateAvatar: PropTypes.func,
  isOpen: PropTypes.boll,
  onClose: PropTypes.func,
}

export default EditAvatarPopup;