import { openPopup, popupImage, bigPicture, bigPictureTitle } from './index.js'

export default class Card {
	constructor(data, cardSelector) {
		this._name = data.name
		this._link = data.link
		this._cardSelector = cardSelector
	}

	_getTemplate() {
		const card = document
			.querySelector(this._cardSelector)
			.content.querySelector('.card')
			.cloneNode(true)
		return card
	}

	_handleLike(e) {
		e.target.classList.toggle('card__heart_active')
	}

	_setEventListeners() {
		this._element.querySelector('.card__heart').addEventListener('click', e => {
			this._handleLike(e)
		})
		this._element
			.querySelector('.card__trash')
			.addEventListener('click', () => this._element.remove())
		this._element
			.querySelector('.card__image')
			.addEventListener('click', () => {
				openPopup(popupImage)
				bigPicture.src = this._link
				bigPictureTitle.textContent = this._name
				bigPicture.alt = this._name
			})
	}

	generateCard() {
		this._element = this._getTemplate()
		this._setEventListeners()
		const cardImage = this._element.querySelector('.card__image')
		const cardTitle = this._element.querySelector('.card__title')
		cardImage.src = this._link
		cardImage.alt = this._name
		cardTitle.textContent = this._name

		return this._element
	}
}
