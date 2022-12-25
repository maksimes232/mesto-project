const initialCards = [
  {
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

const popup = document.querySelector('#popup');
const profileEditProfileBtn = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__close-icon');
const formAddCard = document.querySelector('#form-add-card');
const formEditProfile = document.querySelector('#form-edit-profile');
const profileName = document.querySelector('.profile__title');
const profileDesciption = document.querySelector('.profile__description');
const Elements = document.querySelector('.elements');
const popupContainer = document.querySelector('.popup__container');
let fullSizePopup = document.querySelector('.popup__fullsize');
const cardTemplate = document.querySelector('#card').content;

function addVisibility (item) {
  popup.classList.add('popup_opened');
  item.classList.add('popup_opened');

  item.removeAttribute('hidden');
  popup.removeAttribute('hidden');
}

initialCards.forEach(function (item) {
  let newCard = cardTemplate.querySelector('.card').cloneNode(true);  
  let cardImg = newCard.querySelector('.card__image');
  let cardTitle = newCard.querySelector('.card__title');

  cardTitle.textContent = item.name;
  cardImg.src = item.link;

  cardImg.addEventListener('click', function () {
    const fullSizePopup = document.querySelector('.popup__fullsize');
    const fullSizeImg = document.querySelector('popup__fullsize-img');

    addVisibility (fullSizePopup);
    popupContainer.classList.add('popup_opened-fullsize');
    fullSizePopup.querySelector('.popup__fullsize-title').textContent = cardTitle.textContent;
    fullSizePopup.querySelector('.popup__fullsize-img').src = cardImg.src;
  });
  newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  newCard.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    newCard.remove();
  });

  Elements.append(newCard);
})

closePopupButton.addEventListener('click', closePopup);
function closePopup() {
  popup.classList.remove('popup_opened');
  formAddCard.classList.remove('popup_opened');
  formEditProfile.classList.remove('popup_opened');
  fullSizePopup.classList.remove('popup_opened');

  formAddCard.addEventListener('transitionend', function (){
    popup.setAttribute('hidden', true);
    formAddCard.setAttribute('hidden', true);
    formEditProfile.setAttribute('hidden', true);
    fullSizePopup.setAttribute('hidden', true);
    popupContainer.classList.remove('popup_opened-fullsize');
});

  formEditProfile.addEventListener('transitionend', closePopupFunction);
  fullSizePopup.addEventListener('transitionend', closePopupFunction);
  
  function closePopupFunction (){
    popup.setAttribute('hidden', true);
    formAddCard.setAttribute('hidden', true);
    formEditProfile.setAttribute('hidden', true);
    fullSizePopup.setAttribute('hidden', true);
    popupContainer.classList.remove('popup_opened-fullsize');
  }
};

profileAddButton.addEventListener('click', function () {
  addVisibility (formAddCard);

  formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let newCard = cardTemplate.querySelector('.card').cloneNode(true);  
    let cardImg = newCard.querySelector('.card__image');
    let cardTitle = newCard.querySelector('.card__title');
    const formCardTitle = document.querySelector('#card-name').value;
    const formCardImg = document.querySelector('#card-img-link').value;
    
    cardTitle.textContent = formCardTitle;
    cardImg.src = formCardImg;
    
    newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_active');
    })
    newCard.querySelector('.card__delete-button').addEventListener('click', function (evt) {
      newCard.remove();
    })

    newCard.addEventListener('click', function () {
      popup.classList.add('popup_opened');
      fullSizePopup.removeAttribute('hidden');
    })

    Elements.append(newCard);
    closePopup();
    });
});

profileEditProfileBtn.addEventListener('click', function () {
  addVisibility(formEditProfile);
  let formProfileName = document.querySelector('#profile-name');
  let formDescriptionName = document.querySelector('#profile-description');

  formProfileName.value = profileName.textContent;
  formDescriptionName.value = profileDesciption.textContent;

  formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value;
    profileDesciption.textContent = formDescriptionName.value;
    closePopup();
  });
});