'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var userDialog = document.querySelector('.setup'); // обращаемся к модальному окну
  var userNameInput = document.querySelector('.setup-user-name'); // инпут имени персонажа

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    userDialog: userDialog,
    userNameInput: userNameInput
  };
})();
