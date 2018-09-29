//import TRex from '../prefabs/trex'
//import UFO from '../prefabs/ufo'

class Game extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    constructor() {
        super();
    }

    create() {
        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        text.anchor.set(0.5);

        this.input.onDown.add(this.endGame, this);
    }

    update() {

    }

    endGame() {
        this.game.state.start('gameover');
    }

}

module.exports = Game
