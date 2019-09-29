'use strict';

// Создание других волшебников
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var QUANTITY_WIZARD = 4;

  var userSetup = document.querySelector('.setup-similar');
  userSetup.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderDescriptionWizard = function (name, surname, coatColor, eyesColor, quantity) {
    var descriptionWizards = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: name[window.util.getRandomNumber(name.length)] + ' ' + surname[window.util.getRandomNumber(surname.length)],
        coatColor: coatColor[window.util.getRandomNumber(coatColor.length)],
        eyesColor: eyesColor[window.util.getRandomNumber(eyesColor.length)]
      };
      descriptionWizards.push(wizard);
    }
    return descriptionWizards;
  };

  var allWizards = renderDescriptionWizard(WIZARD_NAMES, WIZARD_SURNAMES, window.util.COAT_COLORS, window.util.EYES_COLORS, QUANTITY_WIZARD);

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
})();
