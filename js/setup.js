'use strict';

// Создание других волшебников
(function () {

  var userSetup = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var coatColor;
  var eyesColor;
  var wizards = [];

  // Функция присвоения баллов похожести по критерию плаща и глаз
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };


  // Функция сортировки волшебниокв по плащу и глазам
  var updateWizards = function () {

    renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };


  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });


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
    updateWizards();
  };

  // Вызов функции загрузки данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);

})();
