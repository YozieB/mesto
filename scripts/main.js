let editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close-btn');
let author = document.querySelector('.profile__title');
let job = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let heart = document.querySelectorAll('.card__heart');

editProfile.addEventListener('click', () => {
    nameInput.value = author.textContent.trim();
    jobInput.value = job.textContent.trim();
    popup.classList.add('popup_opened');
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    author.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < heart.length; i++) {
    heart[i].addEventListener('click', () => {
        if (heart[i].classList.contains('card__heart_active')) {
            heart[i].classList.remove('card__heart_active');
        } else {
            heart[i].classList.add('card__heart_active');
        }
    });
}