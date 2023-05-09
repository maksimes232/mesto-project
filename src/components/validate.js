function showFieldError (form, field, fieldErrorText, {fieldError, fieldErrorActive}) {
  const errorElement = form.querySelector(`.${field.id}-error`);
  field.classList.add(fieldError);
  errorElement.textContent = fieldErrorText;
  errorElement.classList.add(fieldErrorActive); 
}
  
function hideFieldError (form, field, {fieldError, fieldErrorActive}) {
  const errorElement = form.querySelector(`.${field.id}-error`);
  field.classList.remove(fieldError);
  errorElement.textContent = '';
  errorElement.classList.remove(fieldErrorActive);
}

function checkInvalidField (fieldList) {
    return fieldList.some((field) => {
    return !field.validity.valid;
  });
};
  
const toggleButtonState = (fieldList, button, {inactiveButtonClass}) => {
  if(checkInvalidField(fieldList)){
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  }else{
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled', true);
  };
};

function checkValidityField (form, field, {fieldError, fieldErrorActive}) {
  if(field.validity.patternMismatch){
    field.setCustomValidity(field.dataset.errorMessage);
  }else{
    field.setCustomValidity("");
  }
  
  if(!field.validity.valid){
    showFieldError(form, field, field.validationMessage, {fieldError, fieldErrorActive});
  }else{
    hideFieldError(form, field, {fieldError, fieldErrorActive});
  }
};
  
function setEventListeners (fieldList, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = Array.from(fieldList.querySelectorAll(inputSelector));
  const formButton = fieldList.querySelector(submitButtonSelector);
  inputList.forEach((field) => {
    field.addEventListener('input', () => {
    checkValidityField(fieldList, field, {fieldError, fieldErrorActive});
    toggleButtonState(inputList, formButton, {inactiveButtonClass});
    });
  });
};
  
function enableValidation ({formSelector, ...rest}) {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((form) => {  
    form.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    })
    setEventListeners(form, rest);
  })
};

export {enableValidation}