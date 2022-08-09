import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import { imagePopup } from '../../pages/index.js'
import { removePopup } from '../../pages/index.js'
import { api } from '../../pages/index.js'
const generateValidation = (data, selector) => {
  const form = new FormValidator(data, selector)

  return form
}

const generateCard = (data, selector) => {
  const card = new Card(data, selector, {
    handleCardClick: (name, link) => {
      imagePopup.open(name, link)
    },
    handleTrashClick: () => {
      removePopup.open()
      removePopup.currentCard = card
    },
    handleLike: e => {
      if (e.target.classList.contains('card__heart_active')) {
        api.dislike(card.cardId).then(result => {
          card.dislike(result.likes.length)
        })
      } else {
        api.like(card.cardId).then(result => {
          card.like(result.likes.length)
        })
      }
    },
  })
  const cardElement = card.generateCard()
  card.setInitialLikes()
  return cardElement
}

export { generateValidation, generateCard }
