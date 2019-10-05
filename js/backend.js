'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;


  window.backend = {

    // Функция отправки данных игрока на сервер
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkStatus(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT;
      xhr.open('POST', URL_POST);
      xhr.send(data);
    },

    // Функция загрузки данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkStatus(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT;
      xhr.open('GET', URL_GET);
      xhr.send();
    },

    // Функция обработки возможных ошибок при загрузке (отрисовка в DOM)
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }

  };

  // Функция проверки запросов на ошибки
  var checkStatus = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

})();
