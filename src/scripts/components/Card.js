export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this.handleCardClick = handleCardClick
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    return card
  }

  _removeCard() {
    this._element.remove()
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
      .addEventListener('click', () => this._removeCard())
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.card__image')
    this._cardTitle = this._element.querySelector('.card__title')
    this._setEventListeners()
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name

    return this._element
  }
}
