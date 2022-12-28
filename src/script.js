const popupEditProfile = document.querySelector('#popup-edit-profile');
const profileEditProfileBtn = document.querySelector('.profile__edit-button');
const popupEditProfileForm = popupEditProfile.querySelector('#form-edit-profile')
const popupEditProfileFormName = popupEditProfile.querySelector('#profile-name');
const popupEditProfileFormDescription = popupEditProfile.querySelector('#profile-description');
const popupCloseEditProfileButton = popupEditProfile.querySelector('.popup__close-icon');

const popupAddNewCard = document.querySelector('#popup-add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddNewCardForm = document.querySelector('#form-add-card');
const formAddNewCardTitle = popupAddNewCard.querySelector('#card-name');
const formAddNewCardImg = popupAddNewCard.querySelector('#card-img-link');
const cardTemplate = document.querySelector('#card').content;
const popupCloseAddNewButton = popupAddNewCard.querySelector('.popup__close-icon');

const popupFullSize = document.querySelector('#popup-fullsize');
const popupfullSizeImg = popupFullSize.querySelector('.popup__fullsize-img');
const popupFullSizeTitle = popupFullSize.querySelector('.popup__fullsize-title');
const popupCloseFullSizeButton = popupFullSize.querySelector('.popup__close-icon');

const profileName = document.querySelector('.profile__title');
const profileDesciption = document.querySelector('.profile__description');
const cardsStorage = document.querySelector('.elements');
const popupContainer = document.querySelector('.popup__container');


function openPopup (popup) {
  console.log (popup)
  popup.classList.add('popup_opened');
  popup.removeAttribute('hidden');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.addEventListener('transitionend', function (){
    popup.setAttribute('hidden', true);
  });
}


function createCard (title, img) {
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);  
  const cardImg = cardClone.querySelector('.card__image')
  const cardTitle = cardClone.querySelector('.card__title');

  cardTitle.textContent = title;
  cardImg.src = img;
  cardImg.alt = title;

  cardClone.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  cardClone.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    cardClone.remove();
  });

  cardImg.addEventListener('click', function () {
    openPopup(popupFullSize);
    popupFullSizeTitle.textContent = cardTitle.textContent; 
    popupfullSizeImg.src = cardImg.src; 
    popupfullSizeImg.alt = cardTitle.textContent; 
  });
  return cardClone
} 


initialCards.forEach(function (item) {
  const newCard =  createCard(item.name, item.link);
  cardsStorage.prepend(newCard);
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddNewCard)
});

profileEditProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);
  popupEditProfileFormName.value = profileName.textContent ;
  popupEditProfileFormDescription.value = profileDesciption.textContent;
})

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = popupEditProfileFormName.value;
  profileDesciption.textContent = popupEditProfileFormDescription.value;
  closePopup(popupEditProfile);
  popupEditProfileForm.reset();
});

popupAddNewCard.addEventListener('submit', function (event) {
  event.preventDefault()
  const newCard =  createCard(formAddNewCardTitle.value, formAddNewCardImg.value);
  cardsStorage.prepend(newCard);
  closePopup(popupAddNewCard);
  popupAddNewCardForm.reset();
})

popupCloseEditProfileButton.addEventListener('click', function(){
  closePopup(popupEditProfile);
  popupEditProfileForm.reset();
})

popupCloseAddNewButton.addEventListener('click', function(){
  closePopup(popupAddNewCard);
  popupAddNewCardForm.reset();
})

popupCloseFullSizeButton.addEventListener('click', function(){
  closePopup(popupFullSize)
})