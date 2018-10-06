
const FlashingText = require('../prefabs/FlashingText');
const Background = require('../prefabs/Background')

class Menu extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    create() {

      new Background(this.game)
      var message = 'Play again?';
      if (this.game.TRexWon){
        message = "T-Rex 🦖 saved her descendants 🐓 from the aliens 🛸! Hooray!";
      }
      if (this.game.UFOWon){
        message = "The aliens 🛸 love ❤️ their new pet chickens 🐓! Hooray!";
      }

        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, message, {
            font: '42px Emoji',
            fill: '#ffffff',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this.game.width/2
        });
        text.anchor.set(0.5);


        new FlashingText(this.game, this.game.world.centerX, this.game.height, 'Press to continue')

        this.input.onDown.add(this.restartGame, this);
        this.game.global.input.bindOnDown('one', 'a', this.restartGame, this)
        this.game.global.input.bindOnDown('one', 'b', this.restartGame, this)
        this.game.global.input.bindOnDown('two', 'a', this.restartGame, this)
        this.game.global.input.bindOnDown('two', 'b', this.restartGame, this)

    }

    update() {}

    restartGame() {
        this.game.state.start('menu');
    }

}

module.exports = Menu
