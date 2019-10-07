'use strict';

(function () {


  // Валидация формы
  window.util.userNameInput.addEventListener('invalid', function () {
    if (window.util.userNameInput.validity.tooShort) {
      window.util.userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (window.util.userNameInput.validity.tooLong) {
      window.util.userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (window.util.userNameInput.validity.valueMissing) {
      window.util.userNameInput.setCustomValidity('Обязательное поле');
    } else {
      window.util.userNameInput.setCustomValidity('');
    }
  });

  window.util.userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
