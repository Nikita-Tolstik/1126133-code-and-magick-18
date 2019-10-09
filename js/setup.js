'use strict';

// Создание других волшебников
(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

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


  var wizards = [];

  // Функция фильтрации волшебниокв по плащу и глазам
  window.updateWizards = function (coat, eyes) {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coat &&
        it.colorEyes === eyes;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coat;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyes;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);


    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });
    renderWizards(uniqueWizards);
  };

  // Отрисовка волшебников в дом
  var renderWizards = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(renderWizard(data[j]));
    }

    similarListElement.appendChild(fragment);

    userSetup.classList.remove('hidden');
  };


  // Функция успешной загразки данных с сервера
  var successHandler = function (data) {
    wizards = data;
    window.updateWizards();
  };

  // Вызов функции загрузки данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);

})();
