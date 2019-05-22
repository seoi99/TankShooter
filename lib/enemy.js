import PlayerTank from './player_tank.js';
import EnemyBullet from './enemy_bullet.js'

class Enemy extends PlayerTank{
  constructor(ctx, tankImg) {
    super();
    this.positionY = 84;
    this.positionX = 1;
    this.randomDrop = Math.random() < 0.1
    this.x = Math.random() < 0.5 ? 0 : 500;
    this.y = Math.random() < 0.5 ? 0 : 500;
    if (this.x === 0) {
      this.y =  Math.random() * 500
    }
    if (this.y === 0) {
      this.x = Math.random() * 500
    }
    this.ballx = this.x;
    this.bally = this.y;
    this.dy = 5
    this.speed = 1;
    this.ballSpeed = 10;
    this.rotation = 180;
    this.ctx = ctx;
    this.radius = 2
    this.tankImg = tankImg;
    this.timer = 0;
    this.bullet = null;
    this.enemyLife = 3;
    this.newbullet = false;
  }

  drawEnemy(playerX, playerY) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation * Math.PI / 180);
    this.ctx.drawImage(this.tankImg, this.positionX * this.w, this.positionY, this.w, this.h, -this.w/4, -this.h/4, this.w/2, this.h/2);
    this.ctx.restore()
      this.timer++;
      if (this.timer === 5) {
        this.positionX++
        this.timer = 0;
      }
      if (this.positionX > 7) {
        this.positionX = 1;
      }
      this.updatedir(playerX, playerY)
      this.shootBullet();
  }

  destroyBul () {
    this.bullet = null;
  }

  hitPlayer(playerX, playerY) {
    if( Math.abs(this.bullet.x - playerX) < 42 &&  Math.abs(this.bullet.y - playerY) < 42) {
      this.bullet = new EnemyBullet(this.ctx, this.rotation,this.x,this.y);
      return true;
    }
    return false;
  }

  shootBullet() {
    if (this.bullet === null || (this.bullet.x > 500 || this.bullet.x < 0 || this.bullet.y > 500 || this.bullet.y < 0)) {
      this.bullet = new EnemyBullet(this.ctx, this.rotation,this.x,this.y);
    }
    this.bullet.draw();
  }

  updatedir(playerX, playerY) {

    let xDif = (playerX - this.x)
    let yDif = Math.abs(playerY - this.y)

    if (playerY < this.y) {
      this.y -= this.speed;
    }
    if (playerX < this.x) {
      this.x -= this.speed;
    }

    if (playerX > this.x) {
      this.x += this.speed;
    }
    if (playerY > this.y) {
      this.y += this.speed;
    }

    switch (xDif > yDif) {
      case true:
      this.rotation = playerX - this.x > 0 ? 90 : -90
      break;
      case false:
      this.rotation = playerY - this.y > 0 ? 180 : 0
      break;
    }

  }

  destroyEnemy() {
    super.deletePlayer();
  }


}

export default Enemy;
