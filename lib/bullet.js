
class Bullet{
  constructor(ctx, rotation, x, y, score, itemupdate) {
    this.ctx = ctx;
    this.rotation = rotation;
    this.x = x;
    this.y= y;
    this.speed = 5;
    this.draw = this.draw.bind(this);
    this.radius = 2;
    this.score = score;
    this.image = new Image();
    this.imgw = 21;
    this.imgh = 21;
    this.itemupdate = itemupdate;
  }

  draw() {

    if (this.score >= 100 && this.itemupdate) {

      switch (this.rotation) {
        case 0:
          this.image.src="./asset/bul_top.png" ;break;
        case -90:
          this.image.src="./asset/bul_left.png" ;break;
        case 90:
          this.image.src="./asset/bul_right.png" ;break;
        case 180:
          this.image.src="./asset/bul_bot.png" ;break;
      }
      this.ctx.drawImage(this.image, 0, 0, 255, 255, this.x- 10, this.y - 10, this.imgw, this.imgh);
      this.updatedir();
    } else {
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.fillStyle = "green";
    this.updatedir();
    }
  }

  destroyBul() {
    this.radius = 0;
    this.speed = 0;
    this.x = 0;
    this.y = 0;
    this.imgw = 0;
    this.imgh = 0;
  }

  updatedir() {
    switch (this.rotation) {
      case 0:
        this.y -= this.speed; break;
      case -90:
        this.x -= this.speed; break;
      case 90:
        this.x += this.speed; break;
      case 180:
        this.y += this.speed; break;
    }
  }
}

export default Bullet;
