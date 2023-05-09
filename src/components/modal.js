import {popups, closePopup} from "./utils.js"

const profileAddButton = document.querySelector('.profile__add-button');
const formAddNewCardTitle = popups[1].querySelector('#card-name');
const formAddNewCardImg = popups[1].querySelector('#card-img-link');
const cardTemplate = document.querySelector('#card').content;

const profileEditProfileBtn = document.querySelector('.profile__edit-button');
const popupEditProfileFormName = popups[0].querySelector('#profile-name');
const popupEditProfileFormDescription = popups[0].querySelector('#profile-description');

const popupfullSizeImg = popups[2].querySelector('.popup__fullsize-img');
const popupFullSizeTitle = popups[2].querySelector('.popup__fullsize-title');

const profileName = document.querySelector('.profile__title');
const profileDesciption = document.querySelector('.profile__description');
const cardsStorage = document.querySelector('.elements');
const popupContainer = document.querySelector('.popup__container');

function closePopups (){
  popups.forEach((popup)=>{
    popup.addEventListener("click", (evt)=>{
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon-image')){
        closePopup(popup);
      }
    })
  })
}
closePopups()

export {formAddNewCardTitle, formAddNewCardImg, cardTemplate, popupEditProfileFormName, popupEditProfileFormDescription, profileAddButton, profileEditProfileBtn, cardsStorage, popupfullSizeImg, popupFullSizeTitle, profileName, profileDesciption}