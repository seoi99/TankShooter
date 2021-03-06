# Tank Shooter

[Live!](http://tank-shooter.jake-seo.com/)

## Background
* Tank Shooter is 2d shooting game that is solely used by using vanilla javascript & canvas.

![alt text](https://github.com/seoi99/TankShooter/blob/master/asset/preview.png)

## HOW TO PLAY
* Click Live link to play the game.
* Press "S" to start a game
* Press "Space Bar" to Shoot the enemy tank
* Press "Arrow key" to move a tank

## Feature

### Player Feature
* Once enemy is killed by player, there is a chance of getting HP potion that heals player's HP.
* On Stage 4, player can upgrade bullet from basic to advanced.
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

### Enemy Feature
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

* Enemy will shoot bullet based on current position & rotation.
* Enemy's bullet will not be initialized unless it pass the border.

``` javascript
shootBullet() {
  if (this.bullet === null || (this.bullet.x > 500 || this.bullet.x < 0 || this.bullet.y > 500 || this.bullet.y < 0)) {
    this.bullet = new EnemyBullet(this.ctx, this.rotation,this.x,this.y);
  }
  this.bullet.draw();
}
```



## Future Implementation

### Item Update
* Add more player's actionable feature (bullets, shields, speed boost)
