import hummer from '../js/hummer.js';
import '@testing-library/jest-dom';

document.body.innerHTML = `
  <main class='content'>
  </main>
`;

test('function hummer()', () => {
  const content = document.querySelector('.content');

  hummer();
  content.dispatchEvent(new MouseEvent('mousedown', { shiftKey: true }));
  expect(content.className).toBe('content action');

  content.dispatchEvent(new MouseEvent('mouseup', { shiftKey: true }));
  expect(content.className).toBe('content');
});
