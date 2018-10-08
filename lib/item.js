class Item {
  constructor(ctx, src) {
    this.ctx = ctx;
    this.image = new Image();
    this.image.src= src;
    this.x = Math.random() * 300 + 42;
    this.y = Math.random() * 300 + 42;
    this.w = 21;
    this.h = 21;
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, 255, 255, this.x, this.y, this.w, this.h);
  }

  drop(x, y) {
    this.ctx.drawImage(this.image, 0, 0, 255, 255, x, y, this.w, this.h);
  }
  consumed() {
    this.w = 0;
    this.h = 0;
  }


}
export default Item;
