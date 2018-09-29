const style = require('../fontStyle');

const decimalPlacesToShow = 1

class EggedCounter extends Phaser.Text {

  constructor(game, eggLimit) {
    super(game, game.world.width, 0, '', style)
    //this.timer = timer
    this.eggLimit = eggLimit;
    this.fontSize = 32
    this.anchor.setTo(1, 0)
    this.updateCount(0);
    game.add.existing(this)
    //🐣
    //🥚
  }

  updateCount(newcount){
    this.text = "🍳" + newcount + "/" + this.eggLimit;
  }

  update() {
    // const timeLeft = (this.timer.duration / Phaser.Timer.SECOND).toFixed(decimalPlacesToShow)
    // this.text = timeLeft
    // if (timeLeft < 5) {
    //   this.tint = 0xff0000
    //   this.fontSize = 64
    // } else if (timeLeft < 15) {
    //   this.tint = 0xffff00
    //   this.fontSize = 48
    // } else {
    //   this.tint = 0xffffff
    // }
  }

}

module.exports = EggedCounter
