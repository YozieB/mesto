const showInputError = (formSelector, inputSelector, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
}

const toggleButtonState = (inputList, submitBtn, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitBtn.classList.add(inactiveButtonClass)
    } else {
        submitBtn.classList.remove(inactiveButtonClass)
    }
}
  
const checkInputValidity = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formSelector, inputSelector, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formSelector, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
    const buttonElement = formSelector.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(inputSelector => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(el => {
        el.addEventListener('submit', e => e.preventDefault());
        setEventListeners(el, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass)
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-btn',
    inactiveButtonClass: 'popup__form-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 