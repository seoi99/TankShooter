import PlayerTank from './player_tank.js';
import EnemyBullet from './enemy_bullet.js'

class Enemy extends PlayerTank{
  constructor(ctx, tankImg) {
    super();
    this.positionY = 84;
    this.positionX = 1;
    this.x = Math.random() < 0.5 ? 0 : 500;
    this.y = Math.random() < 0.5 ? 0 : 500;
    this.ballx = this.x;
    this.bally = this.y;
    this.dy = 5
    this.speed = 0.5;
    this.ballSpeed = 10;
    this.rotation = 180;
    this.ctx = ctx;
    this.radius = 2
    this.tankImg = tankImg;
    this.timer = 0;
    this.bullet = null;
    this.newbullet = false;
  }

  drawEnemy(playerX, playerY) {
    // this.ctx.drawImage(this.tankImg, this.posE* this.w, this.posY, this.w, this.h,-this.w/4, -this.h/4, this.w/2, this.h/2);
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
    if (this.w ===0 && this.h === 0) {
      this.x = -42;
      this.y = -42;
    }
    if (playerY < this.y) {
      this.rotation = 0;
      this.y -= this.speed;
    }

    else if (playerX < this.x) {
      this.rotation = -90;
      this.x -= this.speed;
    }

    if (playerX > this.x) {
      this.rotation = 90;
      this.x += this.speed;
    }
    else if (playerY > this.y) {
      this.rotation = 180;
      this.y += this.speed;

    }
    if (this.y === playerY) {
      if(playerX < this.x) {
        this.rotation = -90;
      } else {
        this.rotation = 90;
      }
    }
    if (this.x === playerX) {
      if(playerY < this.y) {
        this.rotation = 0;
      } else {
        this.rotation = 180;
      }
    }
  }

  destroyEnemy() {
    super.deletePlayer();
  }


}

export default Enemy;
