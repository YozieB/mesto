const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]
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
const profileBtn = document.querySelector('.profile__edit-btn')
const cardBtn = document.querySelector('.profile__add-btn')
const cardForm = document.forms.place
const profileForm = document.forms.profile
const profileName = profileForm.elements.name
const profileJob = profileForm.elements.job

export {
  initialCards,
  validationSettings,
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
}