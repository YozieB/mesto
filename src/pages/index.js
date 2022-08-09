import './index.css'
import { generateValidation, generateCard } from '../scripts/utils/utils.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api'
import {
  validationSettings,
  gallery,
  cardPopupSelector,
  profilePopupSelector,
  imagePopupSelector,
  removePopupSelector,
  profileBtn,
  cardBtn,
  profileForm,
  cardForm,
  profileName,
  profileJob,
  profileAvatarForm,
  profileAvatar,
  profileAvatarPopupSelector,
} from '../scripts/utils/constants.js'
import PopupConfirmRemove from '../scripts/components/PopupConfirmRemove'

const profileFormValidation = generateValidation(
  validationSettings,
  profileForm
)
profileFormValidation.enableValidation()

const cardFormValidation = generateValidation(validationSettings, cardForm)
cardFormValidation.enableValidation()

const profileAvatarValidation = generateValidation(
  validationSettings,
  profileAvatarForm
)
profileAvatarValidation.enableValidation()

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '58e0c3d0-e6a7-4bbe-b2ed-1f041ed89baf',
    'Content-Type': 'application/json',
  },
})

/* Promise(api.getInitialCards).then(card => {
  cards.renderitems(card)
}) */

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([user, initialCards]) => {
    cards.renderItems(initialCards)
    userInfo.setUserInfo(user.name, user.about)
    userInfo.setUserAvatar(user.avatar)
  }
)

/* api.getInitialCards().then(result => cards.renderItems(result)) */

/* api.getUserInfo().then(result => {
  console.log(result)
  userInfo.setUserInfo(result.name, result.about)
}) */

const cards = new Section(
  {
    renderer: (cardItem, method = 'append') => {
      const card = generateCard(cardItem, '#card')
      console.log(cardItem)
      cards.addItem(card, method)
    },
  },
  gallery
)

/* cards.renderItems() */

const userInfo = new UserInfo({
  name: '.profile__title',
  bio: '.profile__about',
  avatar: '.profile__image',
})

const removePopup = new PopupConfirmRemove(removePopupSelector, {
  handleRemoveButtonClick: () => {
    api
      .removeCard(removePopup.currentCard.cardId)
      .then(() => {
        removePopup.currentCard.removeCard()
        removePopup.close()
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        removePopup.renderLoading(false, 'Да')
      })
  },
})
removePopup.setEventListeners()

const imagePopup = new PopupWithImage(imagePopupSelector)
imagePopup.setEventListeners()

const cardPopup = new PopupWithForm({
  popupSelector: cardPopupSelector,
  handleSubmit: cardItem => {
    /*     console.log(cardItem) */
    api
      .addCard(cardItem.name, cardItem.link)
      .then(cardItem => {
        cards.renderer(cardItem, 'prepend')
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        cardPopup.renderLoading(false)
      })
  },
})
cardPopup.setEventListeners()

const avatarPopup = new PopupWithForm({
  popupSelector: profileAvatarPopupSelector,
  handleSubmit: avatar => {
    console.log(avatar)
    api
      .updateAvatar(avatar.link)
      .then(res => {
        userInfo.setUserAvatar(res.avatar)
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        avatarPopup.renderLoading(false)
      })
  },
})

avatarPopup.setEventListeners()

const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleSubmit: values => {
    api
      .setUserInfo(values.name, values.job)
      .then(() => {
        userInfo.setUserInfo(values.name, values.job)
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        profilePopup.renderLoading(false)
      })
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

profileAvatar.addEventListener('click', () => {
  profileAvatarValidation.resetValidation()
  avatarPopup.open()
})

export { imagePopup, removePopup, api }
