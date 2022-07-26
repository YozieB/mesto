export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._formSelector = formSelector
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    )
    this._buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    )
  }

  _showInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled', true)
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
    this._inputList.forEach(el => this._hideInputError(el))
  }

  enableValidation() {
    this._setEventListeners()
  }
}
