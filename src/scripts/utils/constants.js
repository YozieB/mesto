const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
const gallery = '.gallery'
const cardPopupSelector = '.card-popup'
const profilePopupSelector = '.profile-popup'
const imagePopupSelector = '.image-popup'
const removePopupSelector = '.remove-popup'
const profileAvatarPopupSelector = '.avatar-popup'
const profileBtn = document.querySelector('.profile__edit-btn')
const cardBtn = document.querySelector('.profile__add-btn')
const profileAvatarForm = document.forms.avatar
const cardForm = document.forms.place
const profileForm = document.forms.profile
const profileName = profileForm.elements.name
const profileJob = profileForm.elements.job
const profileAvatar = document.querySelector('.profile__image-wrapper')

export {
  validationSettings,
  removePopupSelector,
  gallery,
  cardPopupSelector,
  profilePopupSelector,
  imagePopupSelector,
  profileBtn,
  cardBtn,
  profileForm,
  profileName,
  profileJob,
  cardForm,
  profileAvatarPopupSelector,
  profileAvatar,
  profileAvatarForm,
}
