import {openPopup, popups} from "./utils.js"
import {popupfullSizeImg, popupFullSizeTitle, cardTemplate} from "./modal.js"

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
  
  cardImg.addEventListener('click', function (evt) {
    popupFullSizeTitle.textContent = cardTitle.textContent; 
    popupfullSizeImg.src = cardImg.src; 
    popupfullSizeImg.alt = cardTitle.textContent;
    openPopup(popups[2]);
  });
  return cardClone
}

export {createCard}