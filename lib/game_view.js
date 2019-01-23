import Game from './game.js'

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(this.ctx);
    this.startg = false;
    this.pause = false;
    this.cleared = false;
    this.description = document.getElementById("intro")
    this.start = this.start.bind(this);
  }
  start() {
    if (!this.pause) {
      this.game.setup();
      this.game.draw();
      this.game.animate();
    }
  }

  intro() {
    this.description;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 83 && this.startg === false) {
        this.start();
        this.startg = true;
      }
    })

  }

}

export default GameView;
