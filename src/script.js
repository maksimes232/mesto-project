/*Если я снова вас понял не правильно. Прошу пояснить подробнее мои ошибки.

  Как я понял задание - в форму должен подставляться текст из профиля, но вы указываете это как ошибку. 
  Если я верно понял, то команда .reset() очищает форму, а при каждом запуске подставляется 
  информация из профиля в попапы. 
  
  Так же я не понимаю в чем моя ошибка с добавлением карточек. Они ведь добавляются в начало секции "elements" при помощи .preppend().
  Как я понимаю .prepend() не создает каких либо массивов или объектов, а добавляет его в начало node элемента, что и происходит, на мой взгляд.
  Или новые карточки, доавляемые через попап, должны добавляться через .before() к уже добавившимся при инициализации карточкам?
  Один из студентов предположил, что ошибка в том, что карточки должны быть представленны в том же порядке, что и в массиве, поэтому я поменял .prepend() на append(), что бы восстановить порядок. 
  Если этот студент верно предположил, но карточки все равно должны добавляться через .prepend() то я допишу .reverse(), что бы развернуть массив и карточки начали добавляься в верном порядке. 
  
  Так же отмечу, что я писал в чате группы и старший студент не обнаружила заявленных вами ошибок, а наставник не отвечает мне больше 48ч, поэтому я и пишу сюда свои вопросы, хотя и понимаю, что так поступать неверно.
*/

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
let i = 0

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
    popupFullSizeTitle.textContent = cardTitle.textContent; 
    popupfullSizeImg.src = cardImg.src; 
    popupfullSizeImg.alt = cardTitle.textContent;
    openPopup(popupFullSize);
  });
  return cardClone
} 


initialCards.forEach(function (item) {
  const newCard =  createCard(item.name, item.link);
  cardsStorage.append(newCard);
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddNewCard)
});

profileEditProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);
})

popupEditProfileForm.addEventListener('submit', function (event) {
  event.preventDefault()
  profileName.textContent = popupEditProfileFormName.value;
  profileDesciption.textContent = popupEditProfileFormDescription.value;
  closePopup(popupEditProfile);
  popupEditProfileForm.reset();});

popupAddNewCard.addEventListener('submit', function (event) {
  event.preventDefault()
  const newCard =  createCard(formAddNewCardTitle.value, formAddNewCardImg.value);
  cardsStorage.prepend(newCard);
  closePopup(popupAddNewCard);
  popupAddNewCardForm.reset();
})

popupCloseEditProfileButton.addEventListener('click', function(){
  closePopup(popupEditProfile);
})

popupCloseAddNewButton.addEventListener('click', function(){
  closePopup(popupAddNewCard);
  popupAddNewCardForm.reset();
})

popupCloseFullSizeButton.addEventListener('click', function(){
  closePopup(popupFullSize)
})