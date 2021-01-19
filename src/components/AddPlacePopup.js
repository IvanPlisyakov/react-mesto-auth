import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  const [link, setLink] = React.useState('');
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onAddPlace({
      title: title,
      link: link,
    });
  }

  const AddCardPopupChildren = (
    <>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_name" id="title-input" value={title} onChange={handleChangeTitle} type="text" name="adding-a-picture" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="profile-form__user-error" id="title-input-error"></span>
    </label>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_info" id="link-input" value={link} onChange={handleChangeLink} type="url" name="adding-a-picture" placeholder="Ссылка на картинку" required/>
      <span className="profile-form__user-error" id="link-input-error"></span>
    </label>
  </>
  )

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      children={AddCardPopupChildren}
      onSubmit={handleSubmit}
      formName="adding-a-picture" 
      title="Новое место" 
      buttonSubmitText="Соханить" 
      onClose={props.onClose}
    />
   )
}

export default AddPlacePopup;