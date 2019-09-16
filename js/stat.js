'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // начальная точка облака по Х
var CLOUD_Y = 10; // начальная точка облака по Y
var GAP = 10; // отступы от краев облака
var FONT_GAP = 20; // межстрочный интеврал
var FONT_HEIGHT = 5; // высота строки
var COLUMN_WIDTH = 40; // ширина колонки
var COLUMN_GAP = 50; // отступ между колонками
var BAR_HEIGHT = 150; // максимальная высота колонки

/*
* Функция отрисовки облака*/
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/*
* Функция отрисовки статистики
*
* @param names - Массив с именами
*
* @param times - Массив с затраченным временем
* */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0,0,0,0.7)'); // Тень облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // Облако

  // Отрисовка загаловка
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  /*
  * Возвращает максимальный элемент
  *
  * @param arr - массив для поиска
  *
  * @return - максимальный элемент
  * */
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  /*
  * Получаем максимальное время*/
  var maxTime = getMaxElement(times);

  // Отрисовка гистограммы
  ctx.textBaseline = 'alphabetic';

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);

    /*
    * Закрашиваем столбик в красный цвет, если столбик с именем "Вы"
    * Остальные закрашиваем в синий с рандомным значением насыщенности
    * */
    if (names[i] === 'Вы') {
      ctx.fillStyle = ' rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%,' + Math.round(Math.random() * 100) + '%)';
    }

    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - FONT_GAP - FONT_HEIGHT - GAP, COLUMN_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - FONT_GAP - FONT_HEIGHT - GAP - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_HEIGHT);
  }
};
