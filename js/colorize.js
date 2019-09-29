'use strict';

// Создание возможности выбора цвета мантии, глаз, файрбола. Модуль colorize.js
(function () {
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var setupCoatWizard = setupWizard.querySelector('.wizard-coat');
  var setupEyesWizard = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var coatWizardName = document.querySelector('[name=coat-color]');
  var eyesWizardName = document.querySelector('[name=eyes-color]');
  var fireballWizardName = document.querySelector('[name=fireball-color]');

  var isColorChange = function (element, thingColor, inputValue) {
    var color = thingColor[window.util.getRandomNumber(thingColor.length)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    inputValue.value = color;
  };

  setupCoatWizard.addEventListener('click', function () {
    isColorChange(setupCoatWizard, window.util.COAT_COLORS, coatWizardName);
  });

  setupEyesWizard.addEventListener('click', function () {
    isColorChange(setupEyesWizard, window.util.EYES_COLORS, eyesWizardName);
  });

  setupFireball.addEventListener('click', function () {
    isColorChange(setupFireball, window.util.FIREBALL_COLORS, fireballWizardName);
  });
})();
