import './index.css'
import { generateValidation, generateCard } from '../scripts/utils/utils.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import {
  initialCards,
  validationSettings,
  gallery,
  cardPopupSelector,
  profilePopupSelector,
  imagePopupSelector,
  profileBtn,
  cardBtn,
  profileForm,
  cardForm,
  profileName,
  profileJob,
} from '../scripts/utils/constants.js'

const profileFormValidation = generateValidation(
  validationSettings,
  profileForm
)
profileFormValidation.enableValidation()

const cardFormValidation = generateValidation(validationSettings, cardForm)
cardFormValidation.enableValidation()

const cards = new Section(
  {
    items: initialCards,
    renderer: (cardItem, method = 'append') => {
      const card = generateCard(cardItem, '#card')
      cards.addItem(card, method)
    },
  },
  gallery
)

const userInfo = new UserInfo({
  name: '.profile__title',
  bio: '.profile__about',
})

const imagePopup = new PopupWithImage(imagePopupSelector)
imagePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popupSelector: cardPopupSelector,
  handleSubmit: cardItem => {
    cards.renderer(cardItem, 'prepend')
  },
})
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleSubmit: values => {
    userInfo.setUserInfo(values.name, values.job)
  },
})
profilePopup.setEventListeners()

cardBtn.addEventListener('click', () => {
  cardFormValidation.resetValidation()
  cardPopup.open()
})

profileBtn.addEventListener('click', () => {
  profileFormValidation.resetValidation()
  profilePopup.open()
  const updateBio = userInfo.getUserInfo()
  profileName.value = updateBio.name
  profileJob.value = updateBio.bio
})

cards.renderItems()

export { imagePopup }
