import Bullet from './bullet.js'
import Sound from './sound.js'

class PlayerTank {
  constructor(ctx, tankImg, score, playerLife) {
    this.ctx = ctx;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.w = 84;
    this.h = 84;
    this.x = (this.canvasWidth - this.w/2)/2;
    this.y = this.canvasHeight - this.h/2;
    this.dx = 1;
    this.dy = 1;
    this.positionX = 1;
    this.posE = 1;
    this.posY = 164;
    this.positionY = 0;
    this.speed = 15;
    this.rotation = 0;
    this.tankImg = tankImg;
    this.bullet = [];
    this.score = score;
    this.playerLife = playerLife;
    this.dyingTime = 0;
    this.transform = new Image();
    this.itemupdate = false;
  }

  drawTank() {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation * Math.PI / 180);
      this.ctx.drawImage(this.tankImg, this.positionX * this.w, this.positionY, this.w, this.h, -this.w/4, -this.h/4, this.w/2, this.h/2);
      this.ctx.restore()
    if (this.bullet.length > 0) {
      this.bullet.forEach(bullet => {
        bullet.score = this.score;
      bullet.draw();
    });}
  }
  shoot() {
    this.bullet.push(new Bullet(this.ctx, this.rotation, this.x, this.y, this.score, this.itemupdate));
  }
  deletePlayer() {
    this.posY = 164;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation * Math.PI / 180);
    this.ctx.drawImage(this.tankImg, this.posE* this.w, this.posY, this.w, this.h,-this.w/4, -this.h/4, this.w/2, this.h/2);
    this.ctx.restore()
    for (var i = 0; i < 2; i++) {
      this.posE++
    }
    if (this.posE >= 3) {
      this.w = 0;
      this.h = 0;
      this.posE = 1;
    }

  }

  userAction() {
    document.addEventListener("keydown", e => {

      // tank img change repetition
      if (this.positionX >= 7) this.positionX = 1;
      // left
      if (e.keyCode === 37) {
        this.positionX++;
        this.rotation = -90;
        this.x -= this.speed;
        if (this.x - this.w/4 < 0) {
            this.x = this.w/4;
        }
      }
      // right
      else if (e.keyCode === 39) {
        this.positionX++;
        this.rotation = 90;
        this.x += this.speed;

        if (this.x > this.canvasWidth - this.w / 4) {
            this.x = this.canvasWidth - this.w / 4;
        }
      }
      // top
      else if (e.keyCode === 38) {
        this.positionX++;
        this.rotation = 0;
        this.y -= this.speed;

        if (this.y - this.h/4 < 0) {
            this.y = this.h / 4;
        }
      }
      // down
      else if (e.keyCode === 40) {
        this.positionX++;
        this.rotation = 180;
        this.y += this.speed;
          if (this.y > this.canvasHeight - this.h / 4) {
              this.y = this.canvasHeight - this.h / 4;
          }
      }
      // else if (e.keyCode === 32) {
      //   this.sound.play();
      // }
    })
    document.addEventListener("keyup", e => {
      if (e.keyCode === 32) {
        this.shoot()

      }

    })
  }

}


export default PlayerTank;
