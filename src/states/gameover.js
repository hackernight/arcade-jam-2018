class Menu extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    create() {

      var message = 'Play again?';
      if (this.game.TRexWon){
        message = "T-Rex 🦖 saved her descendants 🐓 from the aliens 🛸! Hooray!";
      }
      if (this.game.UFOWon){
        message = "The aliens 🛸 love ❤️ their new pet chickens 🐓! Hooray!";
      }

        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, message, {
            font: '42px Gameplay',
            fill: '#ffffff',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this.game.width/2
        });
        text.anchor.set(0.5);

        this.input.onDown.add(this.restartGame, this);
    }

    update() {}

    restartGame() {
        this.game.state.start('menu');
    }

}

module.exports = Menu
