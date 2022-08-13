import Popup from './Popup'

export default class PopupConfirmRemove extends Popup {
  constructor(popupSelector, { handleRemoveButtonClick }) {
    super(popupSelector)
    this._removeBtn = this._popupElement.querySelector('.popup__remove-btn')
    this._handleRemoveButtonClick = handleRemoveButtonClick
  }

  setCurrentCard(id) {
    this.currentCard = id
  }

  setEventListeners() {
    this._removeBtn.addEventListener('click', () => {
      this.renderLoading(true)
      this._handleRemoveButtonClick()
    })
    super.setEventListeners()
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._removeBtn.textContent = 'Удаление...'
    } else {
      this._removeBtn.textContent = 'Да'
    }
  }
}
