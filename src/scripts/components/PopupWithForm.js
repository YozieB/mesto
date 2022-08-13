import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._inputs = this._popupForm.querySelectorAll('.popup__input')
    this._popupButton = this._popupElement.querySelector('.popup__form-btn')
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  _getInputValues() {
    const values = {}
    this._inputs.forEach(el => {
      values[el.name] = el.value
    })
    return values
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', e => {
      e.preventDefault()
      this.renderLoading(true)
      this._handleSubmit(this._getInputValues())
    })
    super.setEventListeners()
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = 'Сохранить'
    }
  }
}
