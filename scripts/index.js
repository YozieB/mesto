const author = document.querySelector('.profile__title');
const job = document.querySelector('.profile__about');
const profileBtn = document.querySelector('.profile__edit-btn');
const profileForm = document.forms.profile;
const profileName = profileForm.elements.name;
const profileJob = profileForm.elements.job;
const cardForm = document.forms.place;
const cardName = cardForm.elements.place;
const cardLink = cardForm.elements.link;
const cardBtn = document.querySelector('.profile__add-btn');
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
const popupImage = document.querySelector('.image-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupCard = document.querySelector('.card-popup');
const bigPicture = popupImage.querySelector('.popup__image-pic');
const bigPictureTitle = popupImage.querySelector('.popup__image-title')
const modals = document.querySelectorAll('.popup');

// Creating card
const createCard = (name, link) => {
    const cardTemplate = document.querySelector('#card').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const heart = card.querySelector('.card__heart');
    const removeBtn = card.querySelector('.card__trash');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    heart.addEventListener('click', e => {
        e.target.classList.toggle('card__heart_active');
    });

    removeBtn.addEventListener('click', e => {
        const closestCard = e.target.closest('.card');
        closestCard.remove();
    });

    cardImage.addEventListener('click', e => {
        openPopup(popupImage);
        bigPicture.src = link;
        bigPictureTitle.textContent = name;
        bigPicture.alt = name;
    });

    return card
}

// Open popup
const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeyboard);
}

// Close popup
const closePopup = (element) => {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeyboard);
}

const updateBio = () => {
    profileName.value = author.textContent.trim();
    profileJob.value = job.textContent.trim();
}

const closePopupKeyboard = e => {
    const element = document.querySelector('.popup_opened');
    if (e.key === 'Escape') {
        closePopup(element);
    }
}

// Adding start cards
initialCards.forEach(el => {
    gallery.append(createCard(el.name, el.link));
})

// Adding new card
cardForm.addEventListener('submit', e => {
    e.preventDefault();
    gallery.prepend(createCard(cardName.value, cardLink.value));
    closePopup(popupCard);
})

// closing popups
modals.forEach(el => {
    el.addEventListener('mousedown', e => {
        if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
            closePopup(el);
        }
    })
})

cardBtn.addEventListener('click', () => {
    removeErrors(popupCard);
    /* hideInputError(formSelector, inputSelector, inputErrorClass, errorClass); */
    openPopup(popupCard);
    cardForm.reset();
})

profileBtn.addEventListener('click', () => {
    removeErrors(popupProfile);
    /* hideInputError(formSelector, inputSelector, inputErrorClass, errorClass); */
    openPopup(popupProfile);
    updateBio();
});

profileForm.addEventListener('submit', e => {
    e.preventDefault();
    author.textContent = profileName.value;
    job.textContent = profileJob.value;
    closePopup(popupProfile);
});