'use strict';

(function () {
  var WIZARD_QUANTITY = 4;// максимально выводимое число магов
  var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // обращаемся к блоку со списком похожих персонажей
  var similarListElement = document.querySelector('.setup-similar-list');
  // обращаемся к шаблону персонажа
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat'); // блок мантии Большого персонажа
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes'); // блок глаз Большого персонажа
  var wizardFireball = document.querySelector('.setup-fireball-wrap'); // блок фаербола Большого персонажа

  /*
  * Функция перемешивания массива
  *
  * @param arr - исходный массив
  *
  * @return arr - перемешанный массив
  */
  var shuffleArr = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  // перемешиваем массивы имен, фамилий, цветов
  shuffleArr(WIZARD_FIRSTNAMES);
  shuffleArr(WIZARD_LASTNAMES);
  shuffleArr(WIZARD_COAT_COLOR);
  shuffleArr(WIZARD_EYES_COLOR);

  // создаем пустой массив персонажей
  var wizards = [];

  // наполняем пустой массив
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    // для каждого элемента массива создаем объект
    wizards[i] = {};
    // в объект записываем свойста(имя, цвет мантии, цвет глаз) и их значения
    wizards[i]['name'] = WIZARD_FIRSTNAMES[i] + ' ' + WIZARD_LASTNAMES[i];
    wizards[i]['coatColor'] = WIZARD_COAT_COLOR[i];
    wizards[i]['eyesColor'] = WIZARD_EYES_COLOR[i];
  };

  /*
  * Функция возврщает сгенерированного персонажа
  *
  * @param wizard - персонаж
  *
  * @return wizardElement - сгенерированый персонаж
  */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'];
    wizardElement.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];

    return wizardElement;
  };

  // создаем фрагмент
  var fragment = document.createDocumentFragment();

  // в фрагмент записываем всех сгенерированых персонажей
  for (var j = 0; j < WIZARD_QUANTITY; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }

  // добавляем в блок похожих персонаже созданый фрагмент
  similarListElement.appendChild(fragment);

  // включаем видимость блока похожих персонажей
  window.util.userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // Изменение цвета мантии по клику на Большого персонажа
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = WIZARD_COAT_COLOR[Math.floor(Math.random() * (WIZARD_COAT_COLOR.length))];
  });

  // Изменение цвета глаз по клику на Большого персонажа
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = WIZARD_EYES_COLOR[Math.floor(Math.random() * (WIZARD_EYES_COLOR.length))];
  });

  // Изменение цвета фаербола по клику на Большого персонажа
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = FIREBALL_COLOR[Math.floor(Math.random() * (FIREBALL_COLOR.length))];
  });
})();
