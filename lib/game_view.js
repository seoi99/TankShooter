import Game from './game.js'

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(this.ctx);
    this.startg = false;
    this.cleared = false;
    this.restart = false;
    this.start = this.start.bind(this);
  }
  start() {
      this.game.setup();
      this.game.draw();
      this.game.animate();
  }
  intro() {
    this.ctx.clearRect(0,0,500,500)
    this.ctx.fillStyle = "green"
    this.ctx.font="40px Arial Black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Tank Shooter",250,90);
    this.ctx.font="20px Arial";
    this.ctx.fillText("Press S to start a game",250,250);
    this.ctx.fillText("Acheive 100 Score to upgrade your bullet",250,300);
    this.ctx.fillText("Enjoy!",250,350);
  }
  gameFunc() {
    this.intro();
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 83 && this.startg === false) {
        this.startg = true;
        this.start();
      }
      else if (e.keyCode === 82 && this.game.gg === true) {
        this.game = new Game(this.ctx);
        this.startg = false;
        this.gameFunc();
      }
    })
  }



}

export default GameView;
