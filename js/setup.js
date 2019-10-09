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
  // Функция присвоения баллов похожести по критерию плаща и глаз
  var getRank = function (wizard, coat, eyes) {
    var rank = 0;

    if (wizard.colorCoat === coat) {
      rank += 2;
    }
    if (wizard.colorEyes === eyes) {
      rank += 1;
    }

    return rank;
  };


  // Функция фильтрации волшебниокв по плащу и глазам
  window.updateWizards = function (coatColor, eyesColor) {

    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
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
    wizards = data; // Сохранение в переменную массива данных с сервера
    window.updateWizards();
  };

  // Вызов функции загрузки данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);

})();
