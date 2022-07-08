export default class FormValidator {
	constructor(data, formSelector) {
		this._inputSelector = data.inputSelector
		this._submitButtonSelector = data.submitButtonSelector
		this._inactiveButtonClass = data.inactiveButtonClass
		this._inputErrorClass = data.inputErrorClass
		this._errorClass = data.errorClass
		this._formSelector = formSelector
	}

	_showInputError(formElement, inputElement, errorMessage) {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
		inputElement.classList.add(this._inputErrorClass)
		errorElement.textContent = errorMessage
		errorElement.classList.add(this._errorClass)
	}

	_hideInputError(formElement, inputElement) {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
		inputElement.classList.remove(this._inputErrorClass)
		errorElement.classList.remove(this._errorClass)
		errorElement.textContent = ''
	}

	_checkInputValidity(formElement, inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(
				formElement,
				inputElement,
				inputElement.validationMessage
			)
		} else {
			this._hideInputError(formElement, inputElement)
		}
	}

	_hasInvalidInput = inputList => {
		return inputList.some(inputElement => {
			return !inputElement.validity.valid
		})
	}

	_toggleButtonState(inputList, submitBtn) {
		if (this._hasInvalidInput(inputList)) {
			submitBtn.classList.add(this._inactiveButtonClass)
			submitBtn.setAttribute('disabled', true)
		} else {
			submitBtn.classList.remove(this._inactiveButtonClass)
			submitBtn.removeAttribute('disabled', true)
		}
	}

	removeErrors = element => {
		const textErrors = element.querySelectorAll('.popup__error')
		const inputErrors = element.querySelectorAll('.popup__input_type_error')
		textErrors.forEach(el => {
			el.classList.remove('popup__error_visible')
		})
		inputErrors.forEach(el => {
			el.classList.remove('popup__input_type_error')
		})
	}

	_setEventListeners(formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(this._inputSelector)
		)
		const buttonElement = formElement.querySelector(this._submitButtonSelector)
		this._toggleButtonState(inputList, buttonElement)
		inputList.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(formElement, inputElement)
				this._toggleButtonState(inputList, buttonElement)
			})
		})
	}

	enableValidation() {
		const formList = Array.from(document.querySelectorAll(this._formSelector))
		formList.forEach(formElement => {
			this._setEventListeners(formElement)
		})
	}
}
