import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import { imagePopup } from '../../pages/index.js'
const generateValidation = (data, selector) => {
  const form = new FormValidator(data, selector)

  return form
}

const generateCard = (data, selector) => {
  const card = new Card(data, selector, {
    handleCardClick: (name, link) => {
      imagePopup.open(name, link)
    },
  })
  const cardElement = card.generateCard()

  return cardElement
}

export { generateValidation, generateCard }
