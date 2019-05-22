import Sound from './sound.js'


class Background {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.image = new Image();
    this.w = 84;
    this.h = 84;
    this.positionX = 1;
    this.positionY = this.w * 3;
    this.sound = new Sound('./asset/explosion.mp3')
    this.border = [
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    this.currentStage = 1;
    this.image.src = './asset/bg.png';
    this.player = player;
    this.borderLife = 3;
    const img =  new Image();
    img.src = './asset/tank.jpg';
  }

  setup() {
    this.border.forEach((row, i) => {
      row.forEach((val, j) => {
        if ((val === 0 || val === 7) && i >= 3 && i <= 7 && j >= 3 && j <= 7) {
          this.border[i][j] = 0;
        }
      })
    })
  }

  draw() {
    this.border.forEach((row, i) => {
      row.forEach((val, j) => {
        this.player.bullet.forEach(bul => {
          let bulPos = [bul.x, bul.y];
          let bordPos = [i* this.w/2, j * this.h/2];
          if (this.player.x < bordPos[0]) {
            bordPos[0] += this.w/2
          }
          if (this.player.y < bordPos[1]) {
            bordPos[1] += this.h/2
          }
          if ((Math.abs(bulPos[0]- bordPos[0]) < this.w/2 && Math.abs(bulPos[1]- bordPos[1])< this.h/2)) {
              bordPos[0]
            if (val === 7) {
              bul.destroyBul();
              this.borderLife--;
              if (this.borderLife === 0) {
                this.sound.play();
                this.border[i][j] = 0;
                this.borderLife = 3
              }
            }
          }
        })
        // styles for each border
        // this.image.src = './asset/tile.png';
        // this.ctx.drawImage(this.image, i * this.w/2, j * this.h/2, this.w/2, this.h/2);
        if (val === 1) {
          this.ctx.drawImage(this.image, val * this.w, this.positionY, this.w, this.h, i * this.w/2, j * this.h/2, this.w/2, this.h/2);
        }
        else if (val === 3) {
          this.ctx.drawImage(this.image, val * this.w, this.positionY, this.w, this.h,i * this.w/2, j * this.h/2, this.w/2, this.h/2);
        }
        else if (val === 7) {
          this.ctx.drawImage(this.image, val * this.w, this.positionY, this.w, this.h,i * this.w/2, j * this.h/2, this.w/2, this.h/2);
        }
        else {
          this.ctx.drawImage(this.image, 0, 0, this.w, this.h,i * this.w/2, j * this.h/2, this.w/2, this.h/2);
        }
      })
    })
  }

}

export default Background
