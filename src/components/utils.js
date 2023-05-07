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

const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('form')

function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.removeAttribute('hidden');
  document.addEventListener('keydown', (evt)=>{
    if(evt.key === "Escape"){
      closePopup(popup);
    }
  })
}
    
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.addEventListener('transitionend', function (){
  popup.setAttribute('hidden', true);
    forms.forEach((form) => {
      form.reset()
    })
  });
}
    
export {initialCards, popups, forms, openPopup, closePopup}