import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._inputs = this._popupForm.querySelectorAll('.popup__input')
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
      this._handleSubmit(this._getInputValues())
      this.close()
    })
    super.setEventListeners()
  }
}
