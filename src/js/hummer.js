export default function hummer() {
  const gameField = document.querySelector('.content');

  gameField.addEventListener('mousedown', () => {
    gameField.classList.toggle('action');
  });

  gameField.addEventListener('mouseup', () => {
    gameField.classList.toggle('action');
  });
}
