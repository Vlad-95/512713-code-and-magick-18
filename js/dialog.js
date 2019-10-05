'use strict';


(function () {
  var setupOpen = document.querySelector('.setup-open'); // кнопка открытия модалки
  var setupClose = document.querySelector('.setup-close'); // кнопка закрытия модалки
  var dialogHandler = document.querySelector('.upload'); // кнопка перетаскивания модалки

  /*
  * Функция нажатия на кнопку ESC
  *
  * @param evt - Объект Event
  */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  /*
  * Функция открытия окна настройки персонажа
  */
  var openPopup = function () {
    window.util.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /*
  * Функция закрытия окна настройки персонажа
  */
  var closePopup = function () {
    window.util.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Отслеживаем клик открытия окна
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Отслеживаем нажатие кнопки открытия окна
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // Отслеживаем клик закрытия окна
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // Отслеживаем нажатие кнопки закрытия окна

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });


  // Перетаскивание окна
  dialogHandler.addEventListener('mousedown', function (evt) {
    // запрет стандартного поведения
    evt.preventDefault();

    // Начальные координаты клика
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // создаем флаг, для последующей проверки и запрет открытия загрузочного окна
    var dragged = false;

    /*
    * Функция перемещения мыши
    *
    * @param moveEvt - Объект Event
    */
    var onMouseMove = function (moveEvt) {
      // запрет стандартного поведения
      moveEvt.preventDefault();
      // устанавливаем флаг во время срабатывания функции перемещения мыши
      dragged = true;

      // разница координат
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // начальные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // координаты записываем в стили top и left
      window.util.userDialog.style.top = (window.util.userDialog.offsetTop - shift.y) + 'px';
      window.util.userDialog.style.left = (window.util.userDialog.offsetLeft - shift.x) + 'px';

    };

    /*
    * Функция отжатия клавиши мыши
    *
    * @param upEvt - объект Event
    */
    var onMouseUp = function (upEvt) {
      // запрет стандартного поведения
      upEvt.preventDefault();

      // удаляем все обработчики
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // проверка флага
      if (dragged) {
        var onClickPreventDefault = function (downEvt) {
          downEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    // добавляем обработчики mousemove, mouseup
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
