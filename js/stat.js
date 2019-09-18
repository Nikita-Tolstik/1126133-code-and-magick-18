'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var BAR_HEIGHT = 20;
var BLOCK_X = CLOUD_X + 40;
var BLOCK_Y = 240;
var BLOCK_WIDTH = 40;
var BLOCK_HEIGHT = -150;
var BLOCK_GAP = 50;
var SCORE_GAP = 220;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP + BAR_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var randomNumber = Math.random() * 100;

    ctx.fillStyle = '#000';
    ctx.font = '14px PT Mono';
    ctx.fillText(Math.round(times[i]), BLOCK_X + (BLOCK_GAP + BLOCK_WIDTH) * i, SCORE_GAP + (BLOCK_HEIGHT * times[i]) / maxTime);
    ctx.fillText(players[i], BLOCK_X + (BLOCK_GAP + BLOCK_WIDTH) * i, BLOCK_Y + GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + randomNumber + '%, 30%)';
    }
    ctx.fillRect(BLOCK_X + (BLOCK_GAP + BLOCK_WIDTH) * i, BLOCK_Y, BLOCK_WIDTH, (BLOCK_HEIGHT * times[i]) / maxTime);
  }
};
