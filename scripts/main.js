let editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close-btn');
let author = document.querySelector('.profile__title');
let job = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');

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