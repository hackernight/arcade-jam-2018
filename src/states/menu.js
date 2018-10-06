const CenteredText = require('../prefabs/CenteredText');
const FlashingText = require('../prefabs/FlashingText');


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
        new CenteredText(this.game, this.game.height * 0.10, 'An', {fontSize: '50px', font: 'Gameplay'})
        new CenteredText(this.game, this.game.height * 0.15, 'Abduction', {fontSize: '50px', font: 'Gameplay'})
        new CenteredText(this.game, this.game.height * 0.20, 'Most', {fontSize: '50px', font: 'Gameplay'})
        new CenteredText(this.game, this.game.height * 0.28, 'Fowl', {fontSize: '150px', font: 'BirdFeather'})

        const text = this.add.text(this.game.world.centerX, this.game.height * 0.6,
          "T-Rex 🦖: pick up eggs 🥚, throw eggs 🥚 at the UFO 🛸\n\nUFO 🛸: catch 🎐 all the chickens 🐓"
          , {
            font: '30px Emoji',
            fill: '#ffffff',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this.game.width/1.5
        });
        text.anchor.set(0.5);

        new FlashingText(this.game, this.game.world.centerX, this.game.height, 'Press to continue')


        this.levelMusic = this.game.add.audio('menu-music')
        this.levelMusic.loopFull(0.15)

        this.game.global.input.bindOnDown('one', 'a', this.startGame, this)
        this.game.global.input.bindOnDown('one', 'b', this.startGame, this)
        this.game.global.input.bindOnDown('two', 'a', this.startGame, this)
        this.game.global.input.bindOnDown('two', 'b', this.startGame, this)
        this.input.onDown.add(this.startGame, this);
    }

    update() {}

    startGame() {
        this.levelMusic.stop()
        this.game.state.start('game');
    }

}

module.exports = Menu
