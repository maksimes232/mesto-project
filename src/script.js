const popupEditProfile = document.querySelector('#popup-edit-profile');
const profileEditProfileBtn = document.querySelector('.profile__edit-button');
const popupEditProfileForm = popupEditProfile.querySelector('#form-edit-profile')
const popupEditProfileFormName = popupEditProfile.querySelector('#profile-name');
const popupEditProfileFormDescription = popupEditProfile.querySelector('#profile-description');

const popupAddNewCard = document.querySelector('#popup-add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddNewCardTitle = popupAddNewCard.querySelector('#card-name');
const formAddNewCardImg = popupAddNewCard.querySelector('#card-img-link');

const popupFullSize = document.querySelector('#popup-fullsize');
const popupfullSizeImg = document.querySelector('popup__fullsize-img');

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
  const cardTemplate = document.querySelector('#card').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);  
  const cardImg = cardClone.querySelector('.card__image')
  const cardTitle = cardClone.querySelector('.card__title');

  cardTitle.textContent = title;
  cardImg.src = img;

  cardClone.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  cardClone.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    cardClone.remove();
  });

  function openPopupFullSize(popup){
    openPopup(popup);
    popup.querySelector('.popup__fullsize-title').textContent = cardTitle.textContent; 
    popup.querySelector('.popup__fullsize-img').src = cardImg.src; 
  }

  cardImg.addEventListener('click', function () {
    openPopupFullSize(popupFullSize);
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
  popupEditProfileFormName.placeholder = profileName.textContent ;
  popupEditProfileFormDescription.placeholder = profileDesciption.textContent;

  popupEditProfileFormName.value = "";
  popupEditProfileFormDescription.value = "";
})

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = popupEditProfileFormName.value;
  profileDesciption.textContent = popupEditProfileFormDescription.value;
  closePopup(popupEditProfile);
});

popupAddNewCard.addEventListener('submit', function (event) {
  event.preventDefault()
  const newCard =  createCard(formAddNewCardTitle.value, formAddNewCardImg.value);
  cardsStorage.prepend(newCard);
  closePopup(popupAddNewCard);
})

popupEditProfile.querySelector('.popup__close-icon').addEventListener('click', function(){
  closePopup(popupEditProfile);
})

popupAddNewCard.querySelector('.popup__close-icon').addEventListener('click', function(){
  closePopup(popupAddNewCard);
})

popupFullSize.querySelector('.popup__close-icon').addEventListener('click', function(){
  closePopup(popupFullSize)
})