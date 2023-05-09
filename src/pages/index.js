import './index.css';

import { enableValidation} from '../components/validate';
import {openPopup, forms, popups, initialCards, closePopup} from "../components/utils.js"
import {profileAddButton, profileEditProfileBtn, popupEditProfileFormName, profileName, profileDesciption, popupEditProfileFormDescription, cardsStorage, formAddNewCardTitle, formAddNewCardImg} from "../components/modal.js"
import {createCard} from "../components/card.js"

const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__button_type_error',
  errorClass: 'profile-description-error',
  fieldError: 'form__field_error',
  fieldErrorActive: 'form__field-text-error_active'
});

enableValidation(validationConfig)

function submitEditProfileForm (event) {
  event.preventDefault()
  profileName.textContent = popupEditProfileFormName.value;
  profileDesciption.textContent = popupEditProfileFormDescription.value;
  closePopup(popups[0]);
}

function submitAddCardForm (event) {
  event.preventDefault()
  const newCard =  createCard(formAddNewCardTitle.value, formAddNewCardImg.value);
  cardsStorage.prepend(newCard);
  closePopup(popups[1]);
}

forms[0].addEventListener('submit', (event) => {
  submitEditProfileForm(event)
});

forms[1].addEventListener('submit', (event) => {
  submitAddCardForm (event)
})


function hideFieldError (form, field, {fieldError, fieldErrorActive}) {
  field.classList.remove(fieldError);
  errorElement.textContent = '';
  errorElement.classList.remove(fieldErrorActive);
}

profileAddButton.addEventListener('click', (evt) => {
  forms[1].reset()
  openPopup(popups[1]);
});

profileEditProfileBtn.addEventListener('click', (evt) => {
  forms[0].reset()
  popupEditProfileFormName.value = profileName.textContent;
  popupEditProfileFormDescription.value = profileDesciption.textContent;
  openPopup(popups[0]);
})

initialCards.forEach ((item) => {
  const newCard =  createCard(item.name, item.link);
  cardsStorage.append(newCard);
});
