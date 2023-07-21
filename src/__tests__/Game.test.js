import Game from '../js/Game.js';
import '@testing-library/jest-dom';

document.body.innerHTML = `
  <div class="hole-game">
    <span id="dead">0</span>
    <span id="lost">0</span>
    <div class="hole" id="hole1"></div>
    <div class="hole" id="hole2"></div>
    <div class="hole" id="hole3"></div>
    <div class="hole" id="hole4"></div>
    <div class="hole" id="hole5"></div>
    <div class="hole" id="hole6"></div>
  </div>
`;

test('Game.getId()', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.6;
  global.Math = mockMath;

  const game = new Game('hole');
  const result = game.getId();

  expect(result).toBe(9);
});

test('Game.getId() 10 matches', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.6;
  global.Math = mockMath;

  expect(() => {
    const game = new Game('hole');
    const result = game.getId();
    game.getId();
  }).toThrow(new Error('Something wrong! 10 matches!'));
});

test('Game.changeHole()', () => {
  const domElements = document.querySelectorAll('.hole');

  const game = new Game('hole');
  let spy = jest.spyOn(game, 'getId').mockImplementation(() => 3);
  game.changeHole();
  let result = domElements[3].className;
  expect(result).toBe('hole gobin_in_hole');

  spy = jest.spyOn(game, 'getId').mockImplementation(() => 1);
  game.changeHole();
  result = domElements[3].className;
  expect(result).toBe('hole');
});

test('Game.winLose() if win', () => {
  document.querySelector('#dead').textContent = 10;
  window.alert = jest.fn();

  const game = new Game('hole');
  game.winLose();

  expect(window.alert).toHaveBeenCalledWith('Победа!');
});

test('Game.winLose() if win', () => {
  document.querySelector('#lost').textContent = 5;
  window.alert = jest.fn();

  const game = new Game('hole');
  game.winLose();

  expect(window.alert).toHaveBeenCalledWith('Вы проиграли!');
});

test('Game.logic()', () => {
  const game = new Game('hole');
  const spy = jest.spyOn(game, 'getId').mockImplementation(() => 1);
  jest.useFakeTimers();

  game.logic();
  jest.runOnlyPendingTimers();
  document.querySelector('.hole').dispatchEvent(
    new MouseEvent('click', { bubbles: true, shiftKey: true }),
  );
  expect(document.querySelector('#lost').textContent).toBe('1');

  jest.runOnlyPendingTimers();
  document.querySelector('.gobin_in_hole').dispatchEvent(
    new MouseEvent('click', { bubbles: true, shiftKey: true }),
  );
  expect(document.querySelector('#dead').textContent).toBe('1');
});
