import PlayerTank from "./player_tank.js";
import Enemy from "./enemy.js";
import Background from './background.js';
import Item from './item.js';
import Sound from './sound.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.tankImg = new Image()
    this.tankImg.src = "./asset/tank-sprite.png";
    this.playerLife = 100;
    this.player = new PlayerTank(this.ctx, this.tankImg, this.score, this.playerLife);
    this.enemies = [];
    this.draw = this.draw.bind(this);
    this.stage = 1;
    this.life = 100;
    this.wid = 42;
    this.hei = 42;
    this.onStage = true;
    this.gg = false;
    this.background = new Background(this.ctx, this.player);
    this.wait = 0;
    this.item = new Item(this.ctx, "./asset/bul_top.png");
    this.itemupdate = false;
    this.sound = new Sound("./asset/Cannon+1.mp3")
    this.fps = 0;
    this.enemyfpsMax = 100;
    this.created = 0;
    this.destroyed = 0;
  }


  setup() {
    this.player.x = 500/2;
    this.player.y = 500/2;
    this.background.setup();
  }

  playable() {
      this.ctx.clearRect(0,0,500,500);
      this.background.draw();
      this.player.drawTank();
      this.itemConsumed();
      this.enemycol();
      this.bgconstraint(this.player);
      this.ggman()
  }

  draw() {
    this.fps++
    if (this.onStage) {
    if (this.playerLife > 0) {
      this.playable()
      if (this.fps >= this.enemyfpsMax) {
        if (this.created === this.stage) {
        } else {
          this.created++
          this.enemies.push(new Enemy(this.ctx, this.tankImg))
        }
        this.fps = 0
      }
      requestAnimationFrame(this.draw);
    } else {
      this.gameover()
    }
    }
  }

  enemycol() {
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i]
      enemy.drawEnemy(this.player.x, this.player.y);
      let posP = [this.player.x, this.player.y];
      let posE = [enemy.x, enemy.y];
      this.bgconstraint(enemy);
      this.tankTotank(posP, posE);
      if (this.playerLife <= 0) {
        this.player.deletePlayer();
      }
      if (enemy.hitPlayer(this.player.x, this.player.y)) {
        this.playerLife-= 10;
      }
      this.player.bullet.forEach((bul) => {
        let bulPos = [bul.x, bul.y]
        this.bulTotank(bulPos, posE, enemy, bul)

      })
    }
  }

  bgconstraint(player) {
    this.background.border.forEach((row, i) => {
      row.forEach((val, j) => {
        let left = i * this.wid;
        let right = i * this.wid + this.wid;
        let top = j * this.hei;
        let bot = j * this.hei + this.hei;
        let pr = this.player
        let borderPos = [i * this.wid, j * this.hei]
        let playerCenter = [player.x]
        if (val !== 0) {
            if (player.rotation === -90 && (Math.abs(player.y - top) < 21 || Math.abs(player.y - bot) <= 21) && Math.abs(player.x - right) <= 21) {
              player.x++;
              player.dx = 0;
            }
            if (player.rotation === 90 && (Math.abs(player.y - top) < 21 || Math.abs(player.y - bot) <= 21) && Math.abs(player.x - left) <= 21) {
              player.x--;
              player.dx = 0;
            }
            if (player.rotation === 0 && (Math.abs(player.x - right) < 21 || Math.abs(player.x - left) <= 21) && Math.abs(player.y - bot) <= 21) {
              player.y++;
              player.dy = 0;
            }
            if (player.rotation === 180 && (Math.abs(player.x - right) < 21 || Math.abs(player.x - left) <= 21) && Math.abs(player.y - top) <= 21) {
              player.y--;
              player.dy = 0;
            }
          }

      })
    })
  };

  ggman() {
      if (this.destroyed === this.stage) {
        this.destroyed = 0;
        this.created = 0;
        this.onStage = false;
        this.ctx.clearRect(0,0,500,500);
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,500,500);
        this.ctx.font="30px Acme";
        this.ctx.closePath();
        this.ctx.fillStyle = "#00dc00"
        this.ctx.textAlign = "center"
        this.ctx.fillText(`Stage ${this.stage} cleared`,250,150);
        this.ctx.fillText(`Press [Enter] to Begin Stage ${this.stage + 1}`,250,250);
        this.stage = this.stage + 1;
        this.enemyfpsMax -= 10
      } else {
          this.ctx.font="30px Acme";
          this.ctx.fillStyle = "#00dc00"
          this.ctx.textAlign = "left"
          this.ctx.fillText(`Score ${Math.floor(this.score)}`,10,40);
          this.ctx.textAlign = "right"
          this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,490,40);
          this.wait = 0;
      }
  }

  gameover() {
        this.gg = true;
        this.ctx.clearRect(0,0,500,500);
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,500,500);

        this.ctx.font="40px Acme";
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "center"
        this.ctx.fillText(`GAME OVER`,250,250);
        this.ctx.fillText(`Your Score is ${Math.floor(this.score)}`,250,350);
        this.ctx.font="20px Acme";
        this.ctx.textAlign = "center"
        this.ctx.fillText(`Press R to restart the game`,250,400);
  }

  tankTotank(posP, posE){
    this.ctx.font="30px Acme";
    this.ctx.fillStyle = "#00dc00"
    this.ctx.textAlign = "left"
    this.ctx.fillText(`Score ${Math.floor(this.score)}`,10,40);
    this.ctx.textAlign = "right"
    this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,490,40);

    if( Math.abs(posP[0] - posE[0]) < 42 &&  Math.abs(posP[1] - posE[1]) < 42) {
      this.playerLife -= 1;

    }
  }

  itemConsumed() {
    if (this.stage >= 4) {
      this.item.draw();
      if (Math.abs(this.player.x - this.item.x) < 21 &&  Math.abs(this.player.y - this.item.y) < 21) {
        this.player.itemupdate = true;
        this.itemupdate = true;
        this.item.consumed();
      }
    }
  }



  bulTotank(Bul, Tank, enemy, bullet){
    if( Math.abs(Bul[0] - Tank[0]) < 42 &&  Math.abs(Bul[1] - Tank[1]) < 42) {
      if (this.itemupdate) {
        enemy.enemyLife -= 1.5;
      } else {
        enemy.enemyLife -= 1;
      }
      bullet.destroyBul();

      if (enemy.enemyLife === 0) {
        this.destroyed++;
        this.sound.play();
        this.score += 10;
        this.player.score = this.score;
        enemy.destroyEnemy()
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
      }
    }
  }

  animate() {
    this.player.userAction();
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && this.onStage === false) {
        this.onStage = true;
        this.setup();

        this.draw();
      }
    })
  }
}

export default Game
