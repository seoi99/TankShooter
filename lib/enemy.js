import PlayerTank from './player_tank.js';
import Bullet from './bullet.js'

class Enemy extends PlayerTank{
  constructor(ctx, tankImg) {
    super();
    this.positionY = 84;
    this.positionX = 1;
    this.x = Math.floor(Math.random() * 400 + 100);
    this.y = Math.floor(Math.random() * 300) + 35;
    this.ballx = this.x;
    this.bally = this.y;
    this.dy = 5
    this.speed = 1;
    this.ballSpeed = 2;
    this.rotation = 180;
    this.ctx = ctx;
    this.radius = 2
    this.tankImg = tankImg;
    this.drawTank = this.drawTank.call(this);
    this.timer = 0;
  }

  drawEnemy(playerX, playerY) {
      super.drawTank();
      this.timer++;
      if (this.timer === 5) {
        this.positionX++
        this.timer = 0;
      }
      if (this.positionX > 7) {
        this.positionX = 1;
      }
      this.updatedir(playerX, playerY)

  }

  updatedir(playerX, playerY) {

    if (this.w ===0 && this.h === 0) {
      this.x = -42;
      this.y = -42;
    }
    if (playerY < this.y) {
      this.rotation = 0;
      this.y -= this.speed;
    }

    if (playerX < this.x) {
      this.rotation = -90;
      this.x -= this.speed;
    }

    if (playerX > this.x) {
      this.rotation = 90;
      this.x += this.speed;
    }
    if (playerY > this.y) {
      this.rotation = 180;
      this.y += this.speed;

    }
    else if (this.y === playerY || this.x === playerX) {
      this.rotation = this.rotation;
    }

  }

  destroyEnemy() {
    super.deletePlayer();
  }


}

export default Enemy;
