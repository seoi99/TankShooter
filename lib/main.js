import GameView from './game_view.js'
import Music from './bg_music.js'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("MyCanvas")
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const music = new Music
  const gameview = new GameView(ctx);
  gameview.intro();
  music.musicAction();
})

window.onload = function() {
  document.getElementById("myAudio").play();
}
