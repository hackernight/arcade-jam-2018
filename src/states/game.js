const TRex = require('../prefabs/trex');
const UFO = require('../prefabs/ufo');


var playerLaneY;
var gordie;

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

        var height = this.game.height
        playerLaneY = (height / 3) + 64 * 2.5

        gordie = new TRex(this.game, playerLaneY, 0);


        this.input.onDown.add(this.endGame, this);
    }

    update() {

    }

    endGame() {
        this.game.state.start('gameover');
    }

}

module.exports = Game
