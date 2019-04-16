
class EnemyBullet{
  constructor(ctx, rotation, x, y) {
    this.ctx = ctx;
    this.rotation = rotation;
    this.x = x;
    this.y= y;
    this.draw = this.draw.bind(this);
    this.radius = 2;
    this.imgw = 21;
    this.imgh = 21;
    this.speed = 3;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.fillStyle = "green";
    this.updatedir();
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

export default EnemyBullet;
