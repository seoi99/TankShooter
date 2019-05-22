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
    this.droppedItem = [];
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
      this.itemConsumed();
      this.player.drawTank();
      this.enemycol();
      this.fetchItems();
      this.ggman()
  }

  draw() {
    this.fps++
    if (this.onStage) {
    if (this.playerLife > 0) {
      this.playable()
      if (this.fps >= this.enemyfpsMax) {
        if (this.created === this.stage ** 2) {
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



  ggman() {
      this.ctx.font="30px Acme";
      this.ctx.fillStyle = "#00dc00"
      this.ctx.textAlign = "left"
      this.ctx.fillText(`Score ${Math.floor(this.score)}`,10,40);
      this.ctx.textAlign = "right"
      this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,490,40);

      if (this.destroyed === this.stage ** 2) {
        this.wait++;
        if (this.wait >= 100) {
          this.destroyed = 0;
          this.created = 0;
          this.onStage = false;
          this.ctx.clearRect(0,0,500,500);
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0,0,500,500);
          this.ctx.font="30px Acme";
          this.ctx.fillStyle = "#00dc00"
          this.ctx.textAlign = "center"
          this.ctx.fillText(`Stage ${this.stage} cleared`,250,150);
          this.ctx.fillText(`Press [Enter] to Begin Stage ${this.stage + 1}`,250,250);
          this.stage = this.stage + 1;
          this.enemyfpsMax -= 10
          this.wait = 0;
        }
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
        this.ctx.fillText(`Your Score is ${Math.floor(this.score)}`,250,150);
        this.ctx.fillText(`GAME OVER`,250,250);
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
    for (let i = 0; i < this.droppedItem.length; i++) {
      let droped = this.droppedItem[i]
      if (Math.abs(this.player.x - droped.x) < 21 &&  Math.abs(this.player.y - droped.y) < 21) {
        if (droped.type === "hp") this.playerLife += 30
        this.droppedItem.splice(i, 1)
      }
    }
    if (this.stage === 4 && this.itemupdate === false) {
      let img = new Image()
      img.src = "./asset/bul_top.png"
      let newItem = new Item(this.ctx, img,  100, 300, "bullet")
      this.droppedItem.push(newItem)
      if (Math.abs(this.player.x - newItem.x) < 25 &&  Math.abs(this.player.y - newItem.y) < 25) {
        this.player.itemupdate = true;
        this.itemupdate = true;

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
      this.player.bullet.splice(bullet,1)
      if (enemy.enemyLife === 0) {
        enemy.destroyEnemy()
        if (enemy.randomDrop) {
          let image = new Image()
          image.src = "./asset/life.png"
          this.droppedItem.push(new Item(enemy.ctx, image,  enemy.x, enemy.y));
        }
        this.destroyed++;
        this.sound.play();
        this.score += 10;
        this.player.score = this.score;
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
      }
    }
  }

  fetchItems() {
    for (let i = 0; i < this.droppedItem.length; i++) {
      let drop = this.droppedItem[i];
      drop.draw()
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
