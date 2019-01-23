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
    this.player = new PlayerTank(ctx, this.tankImg, this.score, this.playerLife);
    this.enemies = [];
    this.draw = this.draw.bind(this);
    this.stage = 1;
    this.life = 100;
    this.wid = 42;
    this.hei = 42;
    this.status = true;
    this.gg = false;
    this.enemyLife = 3;
    this.playerLife = 100;
    this.background = new Background(ctx, this.player);
    this.wait = 0;
    this.item = new Item(ctx, "./asset/bul_top.png");
    this.itemupdate = false;
    this.sound = new Sound("./asset/Cannon+1.mp3")
  }

  drawEnemy() {
    for (var i = 0; i < this.stage; i++) {
      this.enemies.push(new Enemy(this.ctx, this.tankImg))
    }
  }

  setup() {
    this.drawEnemy();
    this.player.x = 250;
    this.player.y = 450;
    this.background.setup();
  }

  draw() {
    if (this.status && !this.gg) {
      this.ctx.clearRect(0,0,500,500);
      this.background.draw();
      this.player.drawTank();
      this.itemConsumed();
      this.enemycol();
      this.bgconstraint(this.player);
      this.ggman()
      this.gameover();
      requestAnimationFrame(this.draw);
    }
  }


  enemycol() {
    this.enemies.forEach((enemy) => {
      enemy.drawEnemy(this.player.x, this.player.y);
      let posP = [this.player.x, this.player.y];
      let posE = [enemy.x, enemy.y];
      this.bgconstraint(enemy);
      this.tankTotank(posP, posE);
      this.player.bullet.forEach((bul) => {
        let bulPos = [bul.x, bul.y]
        this.bulTotank(bulPos, posE, enemy, bul);
      })
    })
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
            if (Math.abs(player.y - top) < 21 && Math.abs(player.x - left) < 21) {
              if (player.y < top) {
                player.y = top - 21;
              }
              if (player.x < left) {
                player.x = left - 21;
              }
            }
            else if (Math.abs(player.y - bot) < 21 && Math.abs(player.x - right) < 21) {
              if (player.y > bot) {
                  player.y = bot + 21;
              }
              if (player.x > right) {
                player.x = right + 21;
              }
            }

      }
    })
  })
}

  ggman() {
    if (this.enemies.length > 0) {
      if (this.enemies.filter(enemy => enemy !== "").length === 0) {
        this.ctx.font="30px Acme";
        this.ctx.fillStyle = "#00dc00"
        this.ctx.fillText(`Score ${Math.floor(this.score)}`,40,40);
        this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,300,40);

        this.wait++
        if (this.wait === 80) {
          this.status = false;
          this.ctx.clearRect(0,0,500,500);
          this.ctx.beginPath();
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0,0,500,500);
          this.ctx.font="30px Acme";
          this.ctx.closePath();
          this.ctx.fillStyle = "#00dc00"
          this.ctx.fillText(`Stage ${this.stage} cleared`,150,150);
          this.ctx.fillText(`Press [Enter] to Begin Stage ${this.stage + 1}`,70,250);
          this.stage = this.stage + 1;
          this.wait = 0;
        }
      }
    }
  }

  gameover() {
    if (this.player.w === 0 && this.player.h === 0) {
      this.gg = true;
      delete this.player;
      this.ctx.clearRect(0,0,500,500);
      const img = new Image();
      img.src = './asset/game_over.png'
      img.onload = () => {
        this.ctx.drawImage(img,0,0,500,500);
        this.ctx.font="40px Lobster";
        this.ctx.fillStyle = "#a6fbf8"
        this.ctx.fillText(`Your Score is ${Math.floor(this.score)}`,120,160);

      }
    }
  }

  tankTotank(posP, posE){
    this.ctx.font="30px Acme";
    this.ctx.fillStyle = "#00dc00"
    this.ctx.fillText(`Score ${Math.floor(this.score)}`,40,40);
    this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,300,40);

    if( Math.abs(posP[0] - posE[0]) < 42 &&  Math.abs(posP[1] - posE[1]) < 42) {
      this.playerLife -= 1;
      this.player.playerLife = this.playerLife;
      if (this.playerLife === 0) {
        this.player.deletePlayer();
      }
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


  bulTotank(posP, posE, enemy, bullet){
    if( Math.abs(posP[0] - posE[0]) < 42 &&  Math.abs(posP[1] - posE[1]) < 42) {
      if (this.itemupdate) {
        this.enemyLife -= 1.5;
      } else {
        this.enemyLife -= 1;
      }
      bullet.destroyBul();

      if (this.enemyLife === 0) {
        this.sound.play();
        this.score += 10;
        this.player.score = this.score;
        enemy.destroyEnemy();
        delete this.enemies[this.enemies.indexOf(enemy)]
        this.enemyLife = 3;
      }
    }
  }

  animate() {
    this.player.userAction();
    document.addEventListener("keydown", (e) => {
      if (e.keyCode ===13) {
        this.status = true;
        this.setup();
        this.draw();
      }
    })
  }
}

export default Game
