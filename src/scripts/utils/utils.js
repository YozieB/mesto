import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import { imagePopup, userId } from '../../pages/index.js'
import { removePopup } from '../../pages/index.js'
import { api } from '../../pages/index.js'
const generateValidation = (data, selector) => {
  const form = new FormValidator(data, selector)

  return form
}

const generateCard = (data, selector) => {
  const card = new Card(data, selector, {
    userId: userId,
    handleCardClick: (name, link) => {
      imagePopup.open(name, link)
    },
    handleTrashClick: () => {
      removePopup.open()
      removePopup.setCurrentCard(card)
    },
    handleLike: e => {
      if (e.target.classList.contains('card__heart_active')) {
        api
          .dislike(card.cardId)
          .then(result => {
            card.dislike(result.likes.length)
          })
          .catch(error => console.log(`Error: ${error}`))
      } else {
        api
          .like(card.cardId)
          .then(result => {
            card.like(result.likes.length)
          })
          .catch(error => console.log(`Error: ${error}`))
      }
    },
  })
  const cardElement = card.generateCard()
  return cardElement
}

export { generateValidation, generateCard }
