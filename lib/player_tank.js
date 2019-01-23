import Bullet from './bullet.js'
import Sound from './sound.js'

class PlayerTank {
  constructor(ctx, tankImg, score, playerLife) {
    this.ctx = ctx;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.w = 84;
    this.h = 84;
    this.x = 200;
    this.y = this.canvasHeight - this.h/2;
    this.dx = 0;
    this.dy = 0;
    this.positionX = 1;
    this.posE = 1;
    this.posY = 164;
    this.positionY = 0;
    this.speed = 5;
    this.rotation = 0;
    this.tankImg = tankImg;
    this.bullet = [];
    this.score = score;
    this.playerLife = playerLife;
    this.dyingTime = 0;
    this.transform = new Image();
    this.itemupdate = false;
    this.time = 1;
    this.left = false;
    this.right = false;
    this.top = false;
    this.bot = false;
    this.singleShot = false;
    this.shotDelay = 0;
    this.userAction = this.userAction.bind(this);
  }

  drawTank() {
      this.userAction();
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
    this.x += this.dx;
    this.y += this.dy;
    if (this.singleShot) {
      this.shotDelay++;
      if (this.shotDelay >= 5) {
      this.shoot();
      this.singleShot = false;
      this.shotDelay = 0;
      }
    }
    if (this.left) {
      this.rotation = -90;
      this.dx = -Math.abs(this.speed);
      if (this.x - this.w/4 < 0) {
          this.x = this.w/4;
      }
    }
    if (this.right) {
      this.rotation = 90;
      this.dx = Math.abs(this.speed);
      if (this.x > this.canvasWidth - this.w / 4) {
          this.x = this.canvasWidth - this.w / 4;
      }
    }

    if (this.top) {
      this.rotation = 0;
      this.dy = -Math.abs(this.speed)

      if (this.y - this.h/4 < 0) {
          this.y = this.h / 4;
      }
    }

    if (this.bot) {
      this.rotation = 180;
      this.dy = Math.abs(this.speed);
        if (this.y > this.canvasHeight - this.h / 4) {
            this.y = this.canvasHeight - this.h / 4;
        }
    }


    document.addEventListener("keydown", e => {
      this.positionX++;
      if (this.positionX >= 7) this.positionX = 1;
      // left
      if (e.keyCode === 37) {
        this.left = true;
      }
      // right
      if (e.keyCode === 39) {
        this.right = true;
      }
      // top
      if (e.keyCode === 38) {
        this.top = true;
      }
      // down
      if (e.keyCode === 40) {
        this.bot = true;
      }
      if (e.keyCode === 32) {
        this.singleShot = true;
      }
    })

    document.addEventListener("keyup", e => {
      if (e.keyCode === 32) {
        this.singleShot = false;
      }
      // left
      if (e.keyCode === 37) {
        this.left = false;
        this.dx = 0;
      }
      // right
      if (e.keyCode === 39) {
        this.right = false;
        this.dx = 0;
      }
      // top
      if (e.keyCode === 38) {
        this.top = false;
        this.dy = 0;
      }
      // down
      if (e.keyCode === 40) {
        this.bot = false;
        this.dy = 0;
      }
    })
  }

}


export default PlayerTank;
