import {popupEditProfileFormName} from "./modal.js"
import {popups, forms, closePopup} from "./utils.js"
import {createCard} from "./card.js"
import {formAddNewCardTitle, formAddNewCardImg, cardsStorage,  profileName, profileDesciption} from "./modal.js"

const popupEditProfileFormNameError = popupEditProfileFormName.querySelector('#profile-name');
const popupEditProfileFormDescription = popups[0].querySelector('#profile-description');

function submitEditProfileForm (event) {
  event.preventDefault()
  profileName.textContent = popupEditProfileFormName.value;
  profileDesciption.textContent = popupEditProfileFormDescription.value;
  closePopup(popups[0]);
  forms[0].reset();
}

function submitAddCardForm (event) {
  event.preventDefault()
  const newCard =  createCard(formAddNewCardTitle.value, formAddNewCardImg.value);
  cardsStorage.prepend(newCard);
  closePopup(popups[1]);
  forms[1].reset();
}

function showFieldError (form, field, fieldErrorText) {
  const errorElement = form.querySelector(`.${field.id}-error`);
  field.classList.add('form__field_error');
  errorElement.textContent = fieldErrorText;
  errorElement.classList.add('form__field-text-error_active');
}
  
function hideFieldError (form, field) {
  const errorElement = form.querySelector(`.${field.id}-error`);
  field.classList.remove('form__field_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__field-text-error_active');
}

function checkInvalidField (fieldList) {
  return fieldList.some((field) => {
    return !field.validity.valid;
  });
};
  
function toggleButtonState (fieldList, button) {
  if(checkInvalidField(fieldList)){
    button.classList.add('form__button_disabled');
    button.setAttribute('disabled', true);
  }else{
    button.classList.remove('form__button_disabled');
    button.removeAttribute('disabled', true);
  };
};

function checkValidityField (form, field) {
  if(field.validity.patternMismatch){
    field.setCustomValidity(field.dataset.errorMessage);
  }else{
    field.setCustomValidity("");
  }
  
  if(!field.validity.valid){
    showFieldError(form, field, field.validationMessage);
  }else{
    hideFieldError(form, field);
  }
};
  
function setEventListeners (fieldList){
  const inputList = Array.from(fieldList.querySelectorAll('.form__field'));
  const formButton = fieldList.querySelector('.form__button');
  toggleButtonState(inputList, formButton);
  inputList.forEach((field) => {
    field.addEventListener('input', () => {
    checkValidityField(fieldList, field);
    toggleButtonState(inputList, formButton);
    });
  });
};
  
function enableValidation () {
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    })
    setEventListeners(form);
  })
};

export {submitEditProfileForm, submitAddCardForm, enableValidation}