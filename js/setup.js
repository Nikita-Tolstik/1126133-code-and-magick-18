'use strict';

// Создание других волшебников
(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var QUANTITY_WIZARD = 4;

  var userSetup = document.querySelector('.setup-similar');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // var renderDescriptionWizard = function (name, surname, coatColor, eyesColor, quantity) {
  //   var descriptionWizards = [];
  //   for (var i = 0; i < quantity; i++) {
  //     var wizard = {
  //       name: name[window.util.getRandomNumber(name.length)] + ' ' + surname[window.util.getRandomNumber(surname.length)],
  //       coatColor: coatColor[window.util.getRandomNumber(coatColor.length)],
  //       eyesColor: eyesColor[window.util.getRandomNumber(eyesColor.length)]
  //     };
  //     descriptionWizards.push(wizard);
  //   }
  //   return descriptionWizards;
  // };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // Функция успешной загразки данных с сервера
  var successHandler = function (wizards) {
    var shuffleWizards = window.util.shuffleArray(wizards);
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < QUANTITY_WIZARD; j++) {
      fragment.appendChild(renderWizard(shuffleWizards[j]));
    }

    similarListElement.appendChild(fragment);

    userSetup.classList.remove('hidden');
  };

  // Вызов функции загрузки данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);

})();
