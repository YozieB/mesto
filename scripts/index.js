const editProfile = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelectorAll('.popup__close-btn');
const author = document.querySelector('.profile__title');
const job = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const bioName = formElement.querySelector('.popup__input_name');
const bioJob = formElement.querySelector('.popup__input_job');
const cardName = document.querySelector('.popup__input_place');
const cardLink = document.querySelector('.popup__input_link');
const popupBio = document.querySelector('.popup__bio');
const popupCard = document.querySelector('.popup__card');
const addCardBtn = document.querySelector('.profile__add-btn');
const gallery = document.querySelector('.gallery');
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const popupImage = document.querySelector('.popup__image')

// Creating card
const createCard = (name, link) => {
    const cardTemplate = document.querySelector('#card').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__heart').addEventListener('click', (e) => {
        e.target.classList.toggle('card__heart_active');
    });
    card.querySelector('.card__trash').addEventListener('click', (e) => {
        const closestCard = e.target.closest('.card');
        closestCard.remove();
    });
    card.querySelector('.card__image').addEventListener('click', (e) => {
        openPopup(popupImage);
        popup.classList.add('popup_opened_image');
        popupImage.querySelector('.popup__image-pic').src = e.target.src;
        popupImage.querySelector('.popup__image-title').textContent = card.querySelector('.card__title').textContent;
    });
    return card
}

// Adding start cards
initialCards.forEach(el => {
    gallery.append(createCard(el.name, el.link));
})

// Adding new card
const popupCardForm = popupCard.querySelector('.popup__form');
popupCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    gallery.prepend(createCard(cardName.value, cardLink.value));
    popupCardForm.reset();
    closePopup();
})

// Open popup
const openPopup = (element) => {
    popup.classList.add('popup_opened');
    element.classList.add('popup__item_opened');
}

// Close popup
const closePopup = () => {
    const popupElements = Array.from(popup.children);
    popupElements.forEach(el => {
        el.classList.remove('popup__item_opened');
    });
    popup.classList.remove('popup_opened');
    popup.classList.remove('popup_opened_image');
}

closePopupBtn.forEach(el => {
    el.addEventListener('click', closePopup)
})

addCardBtn.addEventListener('click', () => {
    openPopup(popupCard)
})

editProfile.addEventListener('click', () => {
    openPopup(popupBio);
    bioName.value = author.textContent.trim();
    bioJob.value = job.textContent.trim();
});

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    author.textContent = bioName.value;
    job.textContent = bioJob.value;
    closePopup()
});