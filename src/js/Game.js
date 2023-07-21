export default class Game {
  constructor(_class) {
    this.class = _class;
    this.allElements = document.querySelectorAll(`.${this.class}`);
    this.elementId = 0;
    this.dead = document.getElementById('dead');
    this.lost = document.getElementById('lost');
    this.getId = this.getId.bind(this);
  }

  getId() {
    let counter = 0;
    while (true) {
      counter += 1;
      const newId = Math.round(Math.random() * 15);
      if (newId !== this.elementId) {
        this.elementId = newId;
        break;
      }
      if (counter === 10) {
        throw new Error('Something wrong! 10 matches!');
      }
    }
    return this.elementId;
  }

  changeHole() {
    const id = this.getId();
    if (document.querySelector('.gobin_in_hole')) {
      document.querySelector('.gobin_in_hole').className = 'hole';
    }
    this.allElements[id].className = 'hole gobin_in_hole';
  }

  winLose() {
    if (this.dead.textContent === '10') {
      window.alert('Победа!');
      this.dead.textContent = 0;
      this.lost.textContent = 0;
    } else if (this.lost.textContent === '5') {
      window.alert('Вы проиграли!');
      this.dead.textContent = 0;
      this.lost.textContent = 0;
    }
  }

  logic() {
    this.timer = setInterval(() => { this.changeHole(); }, 1000);
    document.querySelector('.hole-game').addEventListener('click', (e) => {
      if (e.target.className === 'hole gobin_in_hole') {
        this.dead.textContent = Number(this.dead.textContent) + 1;

        clearInterval(this.timer);
        this.changeHole();
        this.timer = setInterval(() => { this.changeHole(); }, 1000);
      } else {
        this.lost.textContent = Number(this.lost.textContent) + 1;
      }

      this.winLose();
    });
  }
}
