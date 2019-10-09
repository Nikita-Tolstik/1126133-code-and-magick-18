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

  // Объект передачи изменения цвета и вызова функции подбора волшебников
  window.wizard = {
    onEyesChange: function (_color) {},
    onCoatChange: function (_color) {}
  };

  var isColorChange = function (element, thingColor, inputValue) {
    var newColor = thingColor[window.util.getRandomNumber(thingColor.length)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = newColor;
    } else {
      element.style.fill = newColor;
    }
    inputValue.value = newColor;

    return newColor;
  };


  var coatColor;
  setupCoatWizard.addEventListener('click', function () {

    coatColor = isColorChange(setupCoatWizard, window.util.COAT_COLORS, coatWizardName);

    window.wizard.onCoatChange(coatColor); // Передача изменений цвета
  });

  var eyesColor;
  setupEyesWizard.addEventListener('click', function () {

    eyesColor = isColorChange(setupEyesWizard, window.util.EYES_COLORS, eyesWizardName);
    window.wizard.onEyesChange(eyesColor); // Передача изменений цвета
  });

  setupFireball.addEventListener('click', function () {
    isColorChange(setupFireball, window.util.FIREBALL_COLORS, fireballWizardName);
  });

})();
