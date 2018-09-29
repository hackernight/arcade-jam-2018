class Menu extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    constructor() {
        super();
    }

    create() {
        game.stage.backgroundColor = "#213ad1";
        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
          "T-Rex 🦖: throw your eggs 🥚 at the UFO 🛸\n\nUFO 🛸: catch 🎐 all the chickens 🐓"
          , {
            font: '42px Arial',
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
