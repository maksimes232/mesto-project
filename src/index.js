import './pages/index.css';

import {submitEditProfileForm, submitAddCardForm, enableValidation} from "./components/validate.js"
import {openPopup, forms, popups, initialCards} from "./components/utils.js"
import {profileAddButton, profileEditProfileBtn, cardsStorage, formAddNewCardTitle, formAddNewCardImg} from "./components/modal.js"
import {createCard} from "./components/card.js"

enableValidation({
  formSelector: '.form__fieldset',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__button_type_error',
  errorClass: 'profile-description-error'
});

forms[0].addEventListener('submit', (event) => {
  submitEditProfileForm(event)
});

forms[1].addEventListener('submit', (event) => {
  submitAddCardForm (event)
})

profileAddButton.addEventListener('click', (evt) => {
  openPopup(popups[1]);
});

profileEditProfileBtn.addEventListener('click', (evt) => {
  openPopup(popups[0]);
})

initialCards.forEach ((item) => {
  const newCard =  createCard(item.name, item.link);
  cardsStorage.append(newCard);
});
