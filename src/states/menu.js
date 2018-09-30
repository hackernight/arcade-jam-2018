const CenteredText = require('../prefabs/CenteredText');

class Menu extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    constructor() {
        super();
    }

    create() {
        game.stage.backgroundColor = "#213ad1";

        // Title
        new CenteredText(this.game, this.game.height * 0.10, 'An', {fontSize: '50px', font: 'Arcade'})
        new CenteredText(this.game, this.game.height * 0.15, 'Abduction', {fontSize: '50px', font: 'Arcade'})
        new CenteredText(this.game, this.game.height * 0.20, 'Most', {fontSize: '50px', font: 'Arcade'})
        new CenteredText(this.game, this.game.height * 0.28, 'Fowl', {fontSize: '150px', font: 'BirdFeather'})

        const text = this.add.text(this.game.world.centerX, this.game.height * 0.6,
          "T-Rex 🦖: throw your eggs 🥚 at the UFO 🛸\n\nUFO 🛸: catch 🎐 all the chickens 🐓"
          , {
            font: '30px Arcade',
            fill: '#ffffff',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this.game.width/1.5
        });
        text.anchor.set(0.5);

        this.input.onDown.add(this.startGame, this);
    }

    update() {}

    startGame() {
        this.game.state.start('game');
    }

}

module.exports = Menu
