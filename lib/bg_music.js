class Music {
  constructor() {
    this.bgm = document.getElementById("myAudio");
    this.sound = document.getElementById("music-button")
    this.icon = document.getElementById("icon")
  }
  musicAction() {
    this.sound.addEventListener("click",() => {
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

export default Music
