export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._popupElement = document.querySelector(this._popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', e => this._handleEscClose(e))
  }

  close() {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', e => this._handleEscClose(e))
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', e => {
      if (
        e.target.classList.contains('popup_opened') ||
        e.target.classList.contains('popup__close-btn')
      ) {
        this.close()
      }
    })
  }
}
