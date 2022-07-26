import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = document
      .querySelector(this._popupSelector)
      .querySelector('.popup__image-pic')
    this._title = document
      .querySelector(this._popupSelector)
      .querySelector('.popup__image-title')
  }
  open(title, link) {
    this._image.src = link
    this._title.textContent = title
    this._image.alt = title
    super.open()
  }
}
