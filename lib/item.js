class Item {
  constructor(ctx, img, x,y, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 21;
    this.h = 21;
    this.fps = 0;
    this.max = 300;
    this.transparency = 1;
    this.image = img;
    this.type = type !== undefined ? "bullet" : "hp"
    this.destroy = false;
  }

  draw() {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }





}
export default Item;
