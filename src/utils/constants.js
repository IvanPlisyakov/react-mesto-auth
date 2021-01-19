/*import lilkristalllImage from '../images/element-lil_krystalll.png';
import opgImage from '../images/element-opg.jpg';
import opiatesImage from '../images/element-opiates.jpg';
import rnbclubImage from '../images/element-rnb_club.jpg';
import sweetdreamsImage from '../images/element-sweet_dreams.jpg';
import nolabelImage from '../images/element-no_label.jpg';*/

/*export const initialCards = [
  {
      name: 'LIL KRYSTALLL',
      link: lilkristalllImage
  },
  {
      name: 'ОПГ СИТИ',
      link: opgImage
  },
  {
      name: 'Опиаты Круг',
      link: opiatesImage
  },
  {
      name: 'РНБ КЛУБ',
      link: rnbclubImage
  },
  {
      name: 'Сладких снов',
      link: sweetdreamsImage
  },
  {
      name: 'NO LABEL',
      link: nolabelImage
  }
];*/

/*export const EditAvatarPopupChildren = (
  <label className="profile-form__field">
    <input className="profile-form__user profile-form__user_data_info" id="avatar-input" type="url" name="adding-a-picture" placeholder="Ссылка на аватар" required/>
    <span className="profile-form__user-error" id="avatar-input-error"></span>
  </label>
)

export const EditProfilePopupChildren = (
  <>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_name" id="name-input" type="text" name="profile-сhange" minLength="2" maxLength="40" required/>
      <span className="profile-form__user-error" id="name-input-error">fygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygiifygiigfygii</span>
    </label>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_info" id="info-input" type="text" name="profile-сhange" minLength="2" maxLength="200" required/>
      <span className="profile-form__user-error" id="info-input-error">f ygiigfygiifygiigf ygiifygiigfyg iifygiigfy giifyg iifygiigfygii fygiigfygiifyg iigfygiifygiig fygiifygii</span>
    </label>
  </>
)

export const AddPlacePopupChildren = (
  <>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_name" id="title-input" type="text" name="adding-a-picture" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="profile-form__user-error" id="title-input-error"></span>
    </label>
    <label className="profile-form__field">
      <input className="profile-form__user profile-form__user_data_info" id="link-input" type="url" name="adding-a-picture" placeholder="Ссылка на картинку" required/>
      <span className="profile-form__user-error" id="link-input-error"></span>
    </label>
  </>
)*/

export const tuningValidation = {
  form: '.profile-form',
  inputTypeError: 'profile-form__user_type_error',
  inputErrorActive: 'profile-form__user-error_active',
  formInput: '.profile-form__user',
  formSubmit: '.profile-form__btn-save',
  buttonInctive: 'profile-form__btn-save_inactive',
};

//переменные связанные с попапами

export const formEditButton = document.querySelector(".form_edit-button"); //формы
export const formAddButton = document.querySelector(".form_add-button");
export const formNewAvatar = document.querySelector('.form_new-avatar');

export const editButton = document.querySelector(".profile__edit-button"); //профиль 
export const addButton = document.querySelector(".profile__add-button"); 
export const newAvatarButton = document.querySelector('.profile__avatar-button')

export const userName = document.querySelector(".profile__user-name"); 
export const userInfo = document.querySelector(".profile__user-info"); 
export const avatarImage = document.querySelector(".profile__avatar"); 

export const keyCodeEsc = 27;

export const userId = 'd031d4975e470bf308783176';