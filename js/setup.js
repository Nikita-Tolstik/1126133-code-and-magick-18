'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MIN_NUMBER = 0;
var QUANTITY_WIZARD = 4;

var descriptionWizards = [];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var userSetup = document.querySelector('.setup-similar');
userSetup.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var renderDescriptionWizard = function () {
  var wizard = {
    name: WIZARD_NAMES[getRandomNumber(MIN_NUMBER, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomNumber(MIN_NUMBER, WIZARD_SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomNumber(MIN_NUMBER, COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomNumber(MIN_NUMBER, EYES_COLORS.length)]
  };
  return descriptionWizards.push(wizard);
};

for (var i = 0; i < QUANTITY_WIZARD; i++) {
  renderDescriptionWizard();
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

for (var j = 0; j < descriptionWizards.length; j++) {
  fragment.appendChild(renderWizard(descriptionWizards[j]));
}

similarListElement.appendChild(fragment);
