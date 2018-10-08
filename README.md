# Tank Shooter

[Live!](http://tank-shooter.jake-seo.com/)

## Background
* Tank Shooter is 2d shooting game that is solely used by using vanilla javascript & canvas.

![alt text](https://github.com/seoi99/TankShooter/blob/master/asset/screenshot.png)


## Feature

### Player's Bullet
* Player's bullet will be fired based on current movement/direction on player.

``` javascript
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
  ```


### Enemy Movement
* Enemy chase player's tank by sending player's current position as a argument in enemy's moving direction
function.

``` javascript

enemydir(playerX, playerY) {

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
```


### Item
* Player can upgrade the weapon after stage 4 by collecting weapon in the map. after player
collide with item position, player will be enable to upgrade their weapon with new sprite image.


``` javascript
itemConsumed() {
  if (this.stage >= 4) {
    this.item.draw();
    if (Math.abs(this.player.x - this.item.x) < 21 &&  Math.abs(this.player.y - this.item.y) < 21) {
      this.player.itemupdate = true;
      this.itemupdate = true;
      this.item.consumed();
    }
  }
}
```


## Future Implementation

### Enemy's Bullet
* Add enemy's bullet to attack current player based on enemy's direction
