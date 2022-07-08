import Card from './Card.js'
import FormValidator from './FormValidator.js'

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
const popupImage = document.querySelector('.image-popup')
const popupProfile = document.querySelector('.profile-popup')
const popupCard = document.querySelector('.card-popup')
const bigPicture = popupImage.querySelector('.popup__image-pic')
const bigPictureTitle = popupImage.querySelector('.popup__image-title')
const modals = document.querySelectorAll('.popup')
const validationSettings = {
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__form-btn',
	inactiveButtonClass: 'popup__form-btn_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const validation = new FormValidator(validationSettings, '.popup__form')

// Open popup
const openPopup = element => {
	element.classList.add('popup_opened')
	document.addEventListener('keydown', closePopupKeyboard)
}

// Close popup
const closePopup = element => {
	element.classList.remove('popup_opened')
	document.removeEventListener('keydown', closePopupKeyboard)
}

const closePopupKeyboard = e => {
	const element = document.querySelector('.popup_opened')
	if (e.key === 'Escape') {
		closePopup(element)
	}
}

const updateBio = () => {
	profileName.value = author.textContent.trim()
	profileJob.value = job.textContent.trim()
}

// closing popups
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
	validation.removeErrors(popupCard)
	openPopup(popupCard)
	cardForm.reset()
})

profileBtn.addEventListener('click', () => {
	validation.removeErrors(popupProfile)
	openPopup(popupProfile)
	updateBio()
})

profileForm.addEventListener('submit', e => {
	e.preventDefault()
	author.textContent = profileName.value
	job.textContent = profileJob.value
	closePopup(popupProfile)
})

initialCards.forEach(item => {
	const card = new Card(item, '#card')
	const cardElement = card.generateCard()
	gallery.append(cardElement)
})

cardForm.addEventListener('submit', e => {
	e.preventDefault()

	const card = new Card({ name: cardName.value, link: cardLink.value }, '#card')
	const cardElement = card.generateCard()

	gallery.prepend(cardElement)
	closePopup(popupCard)
})

validation.enableValidation()

export { openPopup, popupImage, bigPicture, bigPictureTitle }
