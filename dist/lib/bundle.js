!function(t){var s={};function i(e){if(s[e])return s[e].exports;var h=s[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,i),h.l=!0,h.exports}i.m=t,i.c=s,i.d=function(t,s,e){i.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:e})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,s){if(1&s&&(t=i(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var h in t)i.d(e,h,function(s){return t[s]}.bind(null,h));return e},i.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(s,"a",s),s},i.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},i.p="",i(i.s=0)}([function(t,s,i){"use strict";i.r(s);var e=class{constructor(t,s,i,e,h,a){this.ctx=t,this.rotation=s,this.x=i,this.y=e,this.speed=7,this.draw=this.draw.bind(this),this.radius=2,this.score=h,this.image=new Image,this.imgw=21,this.imgh=21,this.itemupdate=a}draw(){if(this.itemupdate){switch(this.rotation){case 0:this.image.src="./asset/bul_top.png";break;case-90:this.image.src="./asset/bul_left.png";break;case 90:this.image.src="./asset/bul_right.png";break;case 180:this.image.src="./asset/bul_bot.png"}this.ctx.drawImage(this.image,0,0,255,255,this.x-10,this.y-10,this.imgw,this.imgh),this.updatedir()}else this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fill(),this.ctx.fillStyle="green",this.updatedir()}updatedir(){switch(this.rotation){case 0:this.y-=this.speed;break;case-90:this.x-=this.speed;break;case 90:this.x+=this.speed;break;case 180:this.y+=this.speed}}};var h=class{constructor(t){this.sound=document.createElement("audio"),this.sound.src=t,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none"}play(){this.sound.play()}stop(){this.sound.pause()}};var a=class{constructor(t,s,i,e){this.ctx=t,this.canvasWidth=500,this.canvasHeight=500,this.w=84,this.h=84,this.x=this.canvasWidth/2,this.y=this.canvasHeight/2,this.dx=0,this.dy=0,this.positionX=1,this.positionY=0,this.posE=1,this.posY=164,this.speed=5,this.rotation=0,this.tankImg=s,this.bullet=[],this.score=i,this.playerLife=e,this.dyingTime=0,this.transform=new Image,this.itemupdate=!1,this.time=1,this.left=!1,this.right=!1,this.top=!1,this.bot=!1,this.singleShot=!1,this.shotDelay=0,this.userAction=this.userAction.bind(this)}drawTank(){this.userAction(),this.ctx.save(),this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.drawImage(this.tankImg,this.positionX*this.w,this.positionY,this.w,this.h,-this.w/4,-this.h/4,this.w/2,this.h/2),this.ctx.restore(),this.bullet.length>0&&this.bullet.forEach(t=>{t.score=this.score,(t.x>500||t.y>500||t.x<0||t.y<0)&&this.bullet.splice(t,1),t.draw()})}shoot(){this.bullet.push(new e(this.ctx,this.rotation,this.x,this.y,this.score,this.itemupdate))}deletePlayer(){this.posY=164,this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.drawImage(this.tankImg,this.posE*this.w,this.posY,this.w,this.h,-this.w/4,-this.h/4,this.w/2,this.h/2),this.ctx.restore();for(var t=0;t<2;t++)this.posE++;this.posE>=3&&(this.w=0,this.h=0)}userAction(){this.x+=this.dx,this.y+=this.dy,this.singleShot&&(this.shotDelay++,this.shotDelay>=5&&(this.shoot(),this.singleShot=!1,this.shotDelay=0)),this.left&&(this.rotation=-90,this.dx=-Math.abs(this.speed),this.x-this.w/4<0&&(this.x=this.w/4)),this.right&&(this.rotation=90,this.dx=Math.abs(this.speed),this.x>this.canvasWidth-this.w/4&&(this.x=this.canvasWidth-this.w/4)),this.top&&(this.rotation=0,this.dy=-Math.abs(this.speed),this.y-this.h/4<0&&(this.y=this.h/4)),this.bot&&(this.rotation=180,this.dy=Math.abs(this.speed),this.y>this.canvasHeight-this.h/4&&(this.y=this.canvasHeight-this.h/4)),document.addEventListener("keydown",t=>{this.positionX++,this.positionX>=7&&(this.positionX=1),37===t.keyCode&&(this.left=!0),39===t.keyCode&&(this.right=!0),38===t.keyCode&&(this.top=!0),40===t.keyCode&&(this.bot=!0),32===t.keyCode&&(this.singleShot=!0)}),document.addEventListener("keyup",t=>{32===t.keyCode&&(this.singleShot=!1),37===t.keyCode&&(this.left=!1,this.dx=0),39===t.keyCode&&(this.right=!1,this.dx=0),38===t.keyCode&&(this.top=!1,this.dy=0),40===t.keyCode&&(this.bot=!1,this.dy=0)})}};var r=class{constructor(t,s,i,e){this.ctx=t,this.rotation=s,this.x=i,this.y=e,this.draw=this.draw.bind(this),this.radius=2,this.imgw=21,this.imgh=21,this.speed=3}draw(){this.ctx.beginPath(),this.ctx.fillStyle="blue",this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fill(),this.updatedir()}updatedir(){switch(this.rotation){case 0:this.y-=this.speed;break;case-90:this.x-=this.speed;break;case 90:this.x+=this.speed;break;case 180:this.y+=this.speed}}};var o=class extends a{constructor(t,s){super(),this.positionY=84,this.positionX=1,this.randomDrop=Math.random()<.1,this.x=Math.random()<.5?0:500,this.y=Math.random()<.5?0:500,0===this.x&&(this.y=500*Math.random()),0===this.y&&(this.x=500*Math.random()),this.ballx=this.x,this.bally=this.y,this.dy=5,this.speed=1,this.ballSpeed=10,this.rotation=180,this.ctx=t,this.radius=2,this.tankImg=s,this.timer=0,this.bullet=null,this.enemyLife=3,this.newbullet=!1}drawEnemy(t,s){this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.drawImage(this.tankImg,this.positionX*this.w,this.positionY,this.w,this.h,-this.w/4,-this.h/4,this.w/2,this.h/2),this.ctx.restore(),this.timer++,5===this.timer&&(this.positionX++,this.timer=0),this.positionX>7&&(this.positionX=1),this.updatedir(t,s),this.shootBullet()}destroyBul(){this.bullet=null}hitPlayer(t,s){return Math.abs(this.bullet.x-t)<42&&Math.abs(this.bullet.y-s)<42&&(this.bullet=new r(this.ctx,this.rotation,this.x,this.y),!0)}shootBullet(){(null===this.bullet||this.bullet.x>500||this.bullet.x<0||this.bullet.y>500||this.bullet.y<0)&&(this.bullet=new r(this.ctx,this.rotation,this.x,this.y)),this.bullet.draw()}updatedir(t,s){let i=t-this.x,e=Math.abs(s-this.y);switch(s<this.y&&(this.y-=this.speed),t<this.x&&(this.x-=this.speed),t>this.x&&(this.x+=this.speed),s>this.y&&(this.y+=this.speed),i>e){case!0:this.rotation=t-this.x>0?90:-90;break;case!1:this.rotation=s-this.y>0?180:0}}destroyEnemy(){super.deletePlayer()}};var n=class{constructor(t,s){this.ctx=t,this.image=new Image,this.w=84,this.h=84,this.positionX=1,this.positionY=3*this.w,this.sound=new h("./asset/explosion.mp3"),this.border=[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]],this.currentStage=1,this.image.src="./asset/bg.png",this.player=s,this.borderLife=3,(new Image).src="./asset/tank.jpg"}setup(){this.border.forEach((t,s)=>{t.forEach((t,i)=>{(0===t||7===t)&&s>=3&&s<=7&&i>=3&&i<=7&&(this.border[s][i]=0)})})}draw(){this.border.forEach((t,s)=>{t.forEach((t,i)=>{this.player.bullet.forEach(e=>{let h=[e.x,e.y],a=[s*this.w/2,i*this.h/2];this.player.x<a[0]&&(a[0]+=this.w/2),this.player.y<a[1]&&(a[1]+=this.h/2),Math.abs(h[0]-a[0])<this.w/2&&Math.abs(h[1]-a[1])<this.h/2&&(a[0],7===t&&(e.destroyBul(),this.borderLife--,0===this.borderLife&&(this.sound.play(),this.border[s][i]=0,this.borderLife=3)))}),1===t?this.ctx.drawImage(this.image,t*this.w,this.positionY,this.w,this.h,s*this.w/2,i*this.h/2,this.w/2,this.h/2):3===t?this.ctx.drawImage(this.image,t*this.w,this.positionY,this.w,this.h,s*this.w/2,i*this.h/2,this.w/2,this.h/2):7===t?this.ctx.drawImage(this.image,t*this.w,this.positionY,this.w,this.h,s*this.w/2,i*this.h/2,this.w/2,this.h/2):this.ctx.drawImage(this.image,0,0,this.w,this.h,s*this.w/2,i*this.h/2,this.w/2,this.h/2)})})}};var l=class{constructor(t,s,i,e,h){this.ctx=t,this.x=i,this.y=e,this.w=21,this.h=21,this.fps=0,this.max=300,this.transparency=1,this.image=s,this.type=void 0!==h?"bullet":"hp",this.destroy=!1}draw(){this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h)}};var c=class{constructor(t){this.ctx=t,this.score=0,this.tankImg=new Image,this.tankImg.src="./asset/tank-sprite.png",this.playerLife=100,this.player=new a(this.ctx,this.tankImg,this.score,this.playerLife),this.enemies=[],this.draw=this.draw.bind(this),this.stage=1,this.life=100,this.wid=42,this.hei=42,this.onStage=!0,this.gg=!1,this.background=new n(this.ctx,this.player),this.wait=0,this.droppedItem=[],this.itemupdate=!1,this.sound=new h("./asset/Cannon+1.mp3"),this.fps=0,this.enemyfpsMax=100,this.created=0,this.destroyed=0}setup(){this.player.x=250,this.player.y=250,this.background.setup()}playable(){this.ctx.clearRect(0,0,500,500),this.background.draw(),this.itemConsumed(),this.player.drawTank(),this.enemycol(),this.fetchItems(),this.ggman()}draw(){this.fps++,this.onStage&&(this.playerLife>0?(this.playable(),this.fps>=this.enemyfpsMax&&(this.created===this.stage**2||(this.created++,this.enemies.push(new o(this.ctx,this.tankImg))),this.fps=0),requestAnimationFrame(this.draw)):this.gameover())}enemycol(){for(let t=0;t<this.enemies.length;t++){let s=this.enemies[t];s.drawEnemy(this.player.x,this.player.y);let i=[this.player.x,this.player.y],e=[s.x,s.y];this.tankTotank(i,e),this.playerLife<=0&&this.player.deletePlayer(),s.hitPlayer(this.player.x,this.player.y)&&(this.playerLife-=10),this.player.bullet.forEach(t=>{let i=[t.x,t.y];this.bulTotank(i,e,s,t)})}}ggman(){this.ctx.font="30px Acme",this.ctx.fillStyle="#00dc00",this.ctx.textAlign="left",this.ctx.fillText(`Score ${Math.floor(this.score)}`,10,40),this.ctx.textAlign="right",this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,490,40),this.destroyed===this.stage**2&&(this.wait++,this.wait>=100&&(this.destroyed=0,this.created=0,this.onStage=!1,this.ctx.clearRect(0,0,500,500),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,500,500),this.ctx.font="30px Acme",this.ctx.fillStyle="#00dc00",this.ctx.textAlign="center",this.ctx.fillText(`Stage ${this.stage} cleared`,250,150),this.ctx.fillText(`Press [Enter] to Begin Stage ${this.stage+1}`,250,250),this.stage=this.stage+1,this.enemyfpsMax-=10,this.wait=0))}gameover(){this.gg=!0,this.ctx.clearRect(0,0,500,500),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,500,500),this.ctx.font="40px Acme",this.ctx.fillStyle="white",this.ctx.textAlign="center",this.ctx.fillText(`Your Score is ${Math.floor(this.score)}`,250,150),this.ctx.fillText("GAME OVER",250,250),this.ctx.font="20px Acme",this.ctx.textAlign="center",this.ctx.fillText("Press R to restart the game",250,400)}tankTotank(t,s){this.ctx.font="30px Acme",this.ctx.fillStyle="#00dc00",this.ctx.textAlign="left",this.ctx.fillText(`Score ${Math.floor(this.score)}`,10,40),this.ctx.textAlign="right",this.ctx.fillText(`Player Life ${Math.floor(this.playerLife/10)}`,490,40),Math.abs(t[0]-s[0])<42&&Math.abs(t[1]-s[1])<42&&(this.playerLife-=1)}itemConsumed(){for(let t=0;t<this.droppedItem.length;t++){let s=this.droppedItem[t];Math.abs(this.player.x-s.x)<21&&Math.abs(this.player.y-s.y)<21&&("hp"===s.type&&(this.playerLife+=30),this.droppedItem.splice(t,1))}if(4===this.stage&&!1===this.itemupdate){let t=new Image;t.src="./asset/bul_top.png";let s=new l(this.ctx,t,100,300,"bullet");this.droppedItem.push(s),Math.abs(this.player.x-s.x)<25&&Math.abs(this.player.y-s.y)<25&&(this.player.itemupdate=!0,this.itemupdate=!0)}}bulTotank(t,s,i,e){if(Math.abs(t[0]-s[0])<42&&Math.abs(t[1]-s[1])<42&&(this.itemupdate?i.enemyLife-=1.5:i.enemyLife-=1,this.player.bullet.splice(e,1),0===i.enemyLife)){if(i.destroyEnemy(),i.randomDrop){let t=new Image;t.src="./asset/life.png",this.droppedItem.push(new l(i.ctx,t,i.x,i.y))}this.destroyed++,this.sound.play(),this.score+=10,this.player.score=this.score,this.enemies.splice(this.enemies.indexOf(i),1)}}fetchItems(){for(let t=0;t<this.droppedItem.length;t++)this.droppedItem[t].draw()}animate(){this.player.userAction(),document.addEventListener("keydown",t=>{13===t.keyCode&&!1===this.onStage&&(this.onStage=!0,this.setup(),this.draw())})}};var d=class{constructor(t){this.ctx=t,this.game=new c(this.ctx),this.startg=!1,this.cleared=!1,this.restart=!1,this.start=this.start.bind(this)}start(){this.game.setup(),this.game.draw(),this.game.animate()}intro(){this.ctx.clearRect(0,0,500,500),this.ctx.fillStyle="green",this.ctx.font="40px Arial Black",this.ctx.textAlign="center",this.ctx.fillText("Tank Shooter",250,90),this.ctx.font="20px Arial",this.ctx.fillText("Press S to start a game",250,250),this.ctx.fillText("Acheive 100 Score to upgrade your bullet",250,300),this.ctx.fillText("Enjoy!",250,350)}gameFunc(){this.intro(),document.addEventListener("keydown",t=>{83===t.keyCode&&!1===this.startg?(this.startg=!0,this.start()):82===t.keyCode&&!0===this.game.gg&&(this.game=new c(this.ctx),this.startg=!1,this.gameFunc())})}};var p=class{constructor(t){this.bgm=document.getElementById("myAudio"),this.bgsound=document.getElementById("music-button"),this.icon=document.getElementById("icon")}musicAction(){this.bgsound.addEventListener("click",()=>{this.bgm.paused?(this.bgm.play(),this.icon.className="fas fa-volume-up"):(this.bgm.pause(),this.icon.className="fas fa-volume-off")})}};document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("MyCanvas");t.width=500,t.height=500;const s=t.getContext("2d"),i=new p;new d(s).gameFunc(),i.musicAction()}),window.onload=function(){document.getElementById("myAudio").play()}}]);
//# sourceMappingURL=bundle.js.map