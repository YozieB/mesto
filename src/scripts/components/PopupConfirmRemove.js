import Popup from './Popup'

export default class PopupConfirmRemove extends Popup {
  constructor(popupSelector, { handleRemoveButtonClick }) {
    super(popupSelector)
    this._removeBtn = this._popupElement.querySelector('.popup__remove-btn')
    this._handleRemoveButtonClick = handleRemoveButtonClick
  }

  setEventListeners() {
    this._removeBtn.addEventListener('click', () => {
      this.renderLoading(true, 'Да')
      this._handleRemoveButtonClick()
    })
    super.setEventListeners()
  }
}
