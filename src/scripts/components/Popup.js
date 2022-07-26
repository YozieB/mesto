export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._element = document.querySelector(this._popupSelector)
  }

  open() {
    this._element.classList.add('popup_opened')
    document.addEventListener('keydown', e => {
      this._handleEscClose(e)
    })
  }

  close() {
    this._element.classList.remove('popup_opened')
    document.removeEventListener('keydown', e => {
      this._handleEscClose(e)
    })
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._element.addEventListener('mousedown', e => {
      if (
        e.target.classList.contains('popup_opened') ||
        e.target.classList.contains('popup__close-btn')
      ) {
        this.close()
      }
    })
  }
}
