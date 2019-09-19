'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MIN_NUMBER = 0;
var QUANTITY_WIZARD = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
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
