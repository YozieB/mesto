export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleTrashClick, handleLike, userId }
  ) {
    this._name = data.name
    this._link = data.link
    this.cardId = data._id
    this._ownerId = data.owner._id
    this.likes = data.likes
    this._cardSelector = cardSelector
    this.handleCardClick = handleCardClick
    this.handleTrashClick = handleTrashClick
    this.handleLike = handleLike
    this._userId = userId
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    return card
  }

  removeCard() {
    this._element.remove()
    this._element = null
  }

  _setInitialLikes() {
    if (
      this.likes
        .map(el => Object.values(el))
        .flat()
        .includes(this._userId)
    ) {
      this._heart.classList.add('card__heart_active')
    } else {
      this._heart.classList.remove('card__heart_active')
    }
  }

  like(result) {
    this._heart.classList.add('card__heart_active')
    this._likeCounter.textContent = result
  }

  dislike(result) {
    this._heart.classList.remove('card__heart_active')
    this._likeCounter.textContent = result
  }

  _setEventListeners() {
    this._element.querySelector('.card__heart').addEventListener('click', e => {
      this.handleLike(e)
    })
    this._trash.addEventListener('click', () => {
      this.handleTrashClick()
    })
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._heart = this._element.querySelector('.card__heart')
    this._cardImage = this._element.querySelector('.card__image')
    this._cardTitle = this._element.querySelector('.card__title')
    this._likeCounter = this._element.querySelector('.card__like-counter')
    this._trash = this._element.querySelector('.card__trash')
    this._setEventListeners()
    this._setInitialLikes()
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name
    this._likeCounter.textContent = this.likes.length
    if (this._ownerId !== this._userId) {
      this._trash.remove()
    }
    return this._element
  }
}
