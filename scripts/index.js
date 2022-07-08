import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { initialCards, validationSettings } from './constants.js'

const author = document.querySelector('.profile__title')
const job = document.querySelector('.profile__about')
const profileBtn = document.querySelector('.profile__edit-btn')
const profileForm = document.forms.profile
const profileName = profileForm.elements.name
const profileJob = profileForm.elements.job
const cardForm = document.forms.place
const cardName = cardForm.elements.place
const cardLink = cardForm.elements.link
const cardBtn = document.querySelector('.profile__add-btn')
const gallery = document.querySelector('.gallery')
const popupImage = document.querySelector('.image-popup')
const popupProfile = document.querySelector('.profile-popup')
const popupCard = document.querySelector('.card-popup')
const bigPicture = popupImage.querySelector('.popup__image-pic')
const bigPictureTitle = popupImage.querySelector('.popup__image-title')
const modals = document.querySelectorAll('.popup')

const generateValidation = (data, selector) => {
  const form = new FormValidator(data, selector)
  return form
}

const profileFormValidation = generateValidation(
  validationSettings,
  profileForm
)

const cardFormValidation = generateValidation(validationSettings, cardForm)

const generateCard = (data, selector) => {
  const card = new Card(data, selector)
  const cardElement = card.generateCard()
  return cardElement
}

const openPopup = element => {
  element.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupKeyboard)
}

const closePopup = element => {
  element.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupKeyboard)
}

const closePopupKeyboard = e => {
  if (e.key === 'Escape') {
    const element = document.querySelector('.popup_opened')
    closePopup(element)
  }
}

const updateBio = () => {
  profileName.value = author.textContent.trim()
  profileJob.value = job.textContent.trim()
}

modals.forEach(el => {
  el.addEventListener('mousedown', e => {
    if (
      e.target.classList.contains('popup_opened') ||
      e.target.classList.contains('popup__close-btn')
    ) {
      closePopup(el)
    }
  })
})

cardBtn.addEventListener('click', () => {
  cardFormValidation.resetValidation()
  openPopup(popupCard)
  cardForm.reset()
})

profileBtn.addEventListener('click', () => {
  profileFormValidation.resetValidation()
  openPopup(popupProfile)
  updateBio()
})

profileForm.addEventListener('submit', e => {
  e.preventDefault()
  author.textContent = profileName.value
  job.textContent = profileJob.value
  closePopup(popupProfile)
})

initialCards.forEach(item => gallery.append(generateCard(item, '#card')))

cardForm.addEventListener('submit', e => {
  e.preventDefault()
  gallery.prepend(
    generateCard({ name: cardName.value, link: cardLink.value }, '#card')
  )
  closePopup(popupCard)
})

profileFormValidation.enableValidation()
cardFormValidation.enableValidation()

export { openPopup, popupImage, bigPicture, bigPictureTitle }
