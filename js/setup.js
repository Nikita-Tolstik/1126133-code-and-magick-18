'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NUMBER = 0;
var QUANTITY_WIZARD = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIRST_ELEMENT = 0;

var userSetup = document.querySelector('.setup-similar');
userSetup.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var renderDescriptionWizard = function (name, surname, coatColor, eyesColor, quantity) {
  var descriptionWizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: name[getRandomNumber(MIN_NUMBER, name.length)] + ' ' + surname[getRandomNumber(MIN_NUMBER, surname.length)],
      coatColor: coatColor[getRandomNumber(MIN_NUMBER, coatColor.length)],
      eyesColor: eyesColor[getRandomNumber(MIN_NUMBER, eyesColor.length)]
    };
    descriptionWizards.push(wizard);
  }
  return descriptionWizards;
};

var allWizards = renderDescriptionWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS, QUANTITY_WIZARD);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderFragment = function (dataWizard) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < dataWizard.length; j++) {
    fragment.appendChild(renderWizard(dataWizard[j]));
  }
  return fragment;
};

similarListElement.appendChild(renderFragment(allWizards));

// Создание слушателей и обработчиков на popup
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputName = setup.querySelector('.setup-user-name');
var setupForm = setup.querySelector('.setup-wizard-form');
setupForm.setAttribute('action', 'https://js.dump.academy/code-and-magick');

var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.setAttribute('minlength', '2');

var tabindexIcon = setupOpen.querySelector('.setup-open-icon');
tabindexIcon.setAttribute('tabindex', '0');
setupClose.setAttribute('tabindex', '0');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


inputName.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

// Добавление слушателей и обработчиков на выбор интерфейса волшебника
var setupWizard = setup.querySelector('.setup-wizard');
var setupCoatWizard = setupWizard.querySelector('.wizard-coat');
var setupEyesWizard = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var coatWizardName = document.getElementsByName('coat-color')[FIRST_ELEMENT];
var eyesWizardName = document.getElementsByName('eyes-color')[FIRST_ELEMENT];
var fireballWizardName = document.getElementsByName('fireball-color')[FIRST_ELEMENT];

setupCoatWizard.addEventListener('click', function () {
  var coatColor = COAT_COLORS[getRandomNumber(MIN_NUMBER, COAT_COLORS.length)];
  setupCoatWizard.style.fill = coatColor;
  coatWizardName.value = coatColor;

});

setupEyesWizard.addEventListener('click', function () {
  var eyesColor = EYES_COLORS[getRandomNumber(MIN_NUMBER, EYES_COLORS.length)];
  setupEyesWizard.style.fill = eyesColor;
  eyesWizardName.value = eyesColor;
});

setupFireball.addEventListener('click', function () {
  var fireballColor = FIREBALL_COLORS[getRandomNumber(MIN_NUMBER, FIREBALL_COLORS.length)];
  setupFireball.style.backgroundColor = fireballColor;
  fireballWizardName.value = fireballColor;
});
