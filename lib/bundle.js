/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound.js */ "./lib/sound.js");



class Background {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.image = new Image();
    this.w = 84;
    this.h = 84;
    this.positionX = 1;
    this.positionY = this.w * 3;
    this.sound = new _sound_js__WEBPACK_IMPORTED_MODULE_0__["default"]('./asset/explosion.mp3')
    this.border = [
      [1,3,3,3,3,3,3,3,3,3,3,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,3,3,3,3,3,3,3,3,3,3,1],
    ]
    this.currentStage = 1;
    this.image.src = './asset/tank-sprite.png';
    this.player = player;
    this.borderLife = 3;
    const img =  new Image();
    img.src = './asset/tank.jpg';

    img.onload = () => {
      this.ctx.font="40px Arial Black";
      this.ctx.fillStyle = "#2C4813"
      this.ctx.fillText("Tank Shooter",50,90);
      this.ctx.fillStyle = "#AC2813"

      this.ctx.font="16px Arial Black";
      this.ctx.fillText("Press S to start a game",100,250);
      this.ctx.fillText("Acheive 100 Score to upgrade your bullet",100,300);
      this.ctx.fillText("Enjoy!",100,350);
    }
  }

  setup() {
    this.border.forEach((row, i) => {
      row.forEach((val, j) => {
        if ((val === 0 || val === 7) && i >= 3 && i <= 7 && j >= 3 && j <= 7) {
          this.border[i][j] = Math.random() < 0.5 ? 0 : 7;
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
            bordPos[0] += 42
          }
          if (this.player.y < bordPos[1]) {
            bordPos[1] += 42
          }
          if ((Math.abs(bulPos[0]- bordPos[0]) < 42 && Math.abs(bulPos[1]- bordPos[1])< 42)) {
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

/* harmony default export */ __webpack_exports__["default"] = (Background);


/***/ }),

/***/ "./lib/bg_music.js":
/*!*************************!*\
  !*** ./lib/bg_music.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Music {
  constructor(src) {
    this.bgm = document.getElementById("myAudio");
    this.bgsound = document.getElementById("music-button")
    this.icon = document.getElementById("icon")
  }
  musicAction() {
    this.bgsound.addEventListener("click",() => {
      if (this.bgm.paused) {
        this.bgm.play()
        this.icon.className = "fas fa-volume-up"
      }
      else {
        this.bgm.pause()
        this.icon.className = "fas fa-volume-off"
      };
    })
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Music);


/***/ }),

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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

    if (this.itemupdate) {

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

/* harmony default export */ __webpack_exports__["default"] = (Bullet);


/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_tank_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_tank.js */ "./lib/player_tank.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ "./lib/bullet.js");



class Enemy extends _player_tank_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
  constructor(ctx, tankImg) {
    super();
    this.positionY = 84;
    this.positionX = 1;
    this.x = Math.floor(Math.random() * 400 + 100);
    this.y = Math.floor(Math.random() * 300) + 35;
    this.ballx = this.x;
    this.bally = this.y;
    this.dy = 5
    this.speed = 1;
    this.ballSpeed = 2;
    this.rotation = 180;
    this.ctx = ctx;
    this.radius = 2
    this.tankImg = tankImg;
    this.drawTank = this.drawTank.call(this);
    this.timer = 0;
  }

  drawEnemy(playerX, playerY) {
      super.drawTank();
      this.timer++;
      if (this.timer === 5) {
        this.positionX++
        this.timer = 0;
      }
      if (this.positionX > 7) {
        this.positionX = 1;
      }
      this.updatedir(playerX, playerY)

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

  destroyEnemy() {
    super.deletePlayer();
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Enemy);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_tank_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player_tank.js */ "./lib/player_tank.js");
/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ "./lib/enemy.js");
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background.js */ "./lib/background.js");
/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item.js */ "./lib/item.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sound.js */ "./lib/sound.js");






class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.tankImg = new Image()
    this.tankImg.src = "./asset/tank-sprite.png";
    this.player = new _player_tank_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, this.tankImg, this.score, this.playerLife);
    this.enemies = [];
    this.draw = this.draw.bind(this);
    this.stage = 1;
    this.life = 100;
    this.wid = 42;
    this.hei = 42;
    this.status = true;
    this.gg = false;
    this.enemyLife = 3;
    this.playerLife = 100;
    this.background = new _background_js__WEBPACK_IMPORTED_MODULE_2__["default"](ctx, this.player);
    this.wait = 0;
    this.item = new _item_js__WEBPACK_IMPORTED_MODULE_3__["default"](ctx, "./asset/bul_top.png");
    this.itemupdate = false;
    this.sound = new _sound_js__WEBPACK_IMPORTED_MODULE_4__["default"]("./asset/Cannon+1.mp3")
  }

  drawEnemy() {
    for (var i = 0; i < this.stage; i++) {
      this.enemies.push(new _enemy_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.ctx, this.tankImg))
    }
  }

  setup() {
    this.drawEnemy();
    this.player.x = 250;
    this.player.y = 450;
    this.background.setup();
  }

  draw() {
    if (this.status && !this.gg) {
      this.ctx.clearRect(0,0,500,500);
      this.background.draw();
      this.player.drawTank();
      this.itemConsumed()
      this.enemycol();
      this.bgconstraint(this.player);
      this.ggman()
      this.gameover();
      requestAnimationFrame(this.draw);
    }
  }


  enemycol() {
    this.enemies.forEach((enemy) => {
      enemy.drawEnemy(this.player.x, this.player.y);
      let posP = [this.player.x, this.player.y];
      let posE = [enemy.x, enemy.y];
      this.bgconstraint(enemy);
      this.tankTotank(posP, posE);
      this.player.bullet.forEach((bul) => {
        let bulPos = [bul.x, bul.y]
        this.bulTotank(bulPos, posE, enemy, bul);
      })
    })
  }

  bgconstraint(player) {
    this.background.border.forEach((row, i) => {
      row.forEach((val, j) => {
        let left = i * this.wid;
        let right = i * this.wid + this.wid;
        let top = j * this.hei;
        let bot = j * this.hei + this.hei;
        let borderPos = [i * this.wid, j * this.hei]
        if (val !== 0) {

          // so hard to change its collision makes it right

            // (Math.abs(player.y - bot) < 21 && Math.abs(player.x - right) < 21)

            if (Math.abs(player.y - top) < 21 && Math.abs(player.x - left) < 21) {
              if (player.y < top) {
                player.y = top - 21;
              }
              if (player.x < left) {
                player.x = left - 21;
              }
            }
            else if (Math.abs(player.y - bot) < 21 && Math.abs(player.x - right) < 21) {
              if (player.y > bot) {
                  player.y = bot + 21;
              }
              if (player.x > right) {
                player.x = right + 21;
              }
            }

      }
    })
  })
}

  ggman() {
    if (this.enemies.length > 0) {
      if (this.enemies.filter(enemy => enemy !== "").length === 0) {
        this.ctx.font="30px Acme";
        this.ctx.fillStyle = "#00dc00"
        this.ctx.fillText(`Score ${Math.floor(this.score)}`,40,40);
        this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,300,40);

        this.wait++
        if (this.wait === 80) {
          this.status = false;
          this.ctx.clearRect(0,0,500,500);
          this.ctx.beginPath();
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0,0,500,500);
          this.ctx.font="30px Acme";
          this.ctx.closePath();
          this.ctx.fillStyle = "#00dc00"
          this.ctx.fillText(`Stage ${this.stage} cleared`,150,150);
          this.ctx.fillText(`Press [Enter] to Begin Stage ${this.stage + 1}`,70,250);
          this.stage = this.stage + 1;
          this.wait = 0;
        }
      }
    }
  }

  gameover() {
    if (this.player.w === 0 && this.player.h === 0) {
      this.gg = true;
      delete this.player;
      this.ctx.clearRect(0,0,500,500);
      const img = new Image();
      img.src = './asset/game_over.png'
      img.onload = () => {
        this.ctx.drawImage(img,0,0,500,500);
        this.ctx.font="40px Lobster";
        this.ctx.fillStyle = "#a6fbf8"
        this.ctx.fillText(`Your Score is ${Math.floor(this.score)}`,120,160);

      }
    }
  }

  tankTotank(posP, posE){
    this.ctx.font="30px Acme";
    this.ctx.fillStyle = "#00dc00"
    this.ctx.fillText(`Score ${Math.floor(this.score)}`,40,40);
    this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,300,40);

    if( Math.abs(posP[0] - posE[0]) < 42 &&  Math.abs(posP[1] - posE[1]) < 42) {
      this.playerLife -= 1;
      this.player.playerLife = this.playerLife;
      if (this.playerLife === 0) {
        this.player.deletePlayer();
      }
    }
  }

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


  bulTotank(posP, posE, enemy, bullet){
    if( Math.abs(posP[0] - posE[0]) < 42 &&  Math.abs(posP[1] - posE[1]) < 42) {
      if (this.itemupdate) {
        this.enemyLife -= 1.5;
      } else {
        this.enemyLife -= 1;
      }
      bullet.destroyBul();

      if (this.enemyLife === 0) {
        this.sound.play();
        this.score += 10;
        this.player.score = this.score;
        enemy.destroyEnemy();
        delete this.enemies[this.enemies.indexOf(enemy)]
        this.enemyLife = 3;
      }
    }
  }

  animate() {
    this.player.userAction();
    document.addEventListener("keydown", (e) => {
      if (e.keyCode ===13) {
        this.status = true;
        this.setup();
        this.draw();
      }
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");


class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    this.startg = false;
    this.pause = false;
    this.cleared = false;
    this.description = document.getElementById("intro")
    // this.start = this.start.bind(this);
  }
  start() {
    if (!this.pause) {
      this.game.setup();
      this.game.draw();
      this.game.animate();
    }
  }

  intro() {
    this.description;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 83 && this.startg === false) {
        this.start();
        this.startg = true;
      }
    })

  }

}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/item.js":
/*!*********************!*\
  !*** ./lib/item.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (Item);


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");
/* harmony import */ var _bg_music_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bg_music.js */ "./lib/bg_music.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas")
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const music = new _bg_music_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  const gameview = new _game_view_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
  gameview.intro();
  music.musicAction();
})

window.onload = function() {
  document.getElementById("myAudio").play();
}


/***/ }),

/***/ "./lib/player_tank.js":
/*!****************************!*\
  !*** ./lib/player_tank.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bullet.js */ "./lib/bullet.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound.js */ "./lib/sound.js");



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
    this.bullet.push(new _bullet_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.rotation, this.x, this.y, this.score, this.itemupdate));
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

    })
    document.addEventListener("keyup", e => {
      if (e.keyCode === 32) {
        this.shoot()

      }

    })
  }

}


/* harmony default export */ __webpack_exports__["default"] = (PlayerTank);


/***/ }),

/***/ "./lib/sound.js":
/*!**********************!*\
  !*** ./lib/sound.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }
  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Sound);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map