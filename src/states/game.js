//import TRex from '../prefabs/trex'
const TRex = require('../prefabs/trex');
const UFO = require('../prefabs/ufo');
const EggedCounter = require('../prefabs/eggedCounter')
const ChickenCounter = require('../prefabs/chickenCounter')
//const style = require('../fontStyle');

var playerLaneY;
var playerLaneY2;
var gordie;
var roswell;

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
        playerLaneY2 = (height / 3) + 32 * 2.5

        gordie = new TRex(this.game, playerLaneY, 0);
        roswell = new UFO(this.game, playerLaneY2, 0);

        this.eggedCounter = new EggedCounter(this.game)
        this.chickenCounter = new ChickenCounter(this.game)


        this.input.onDown.add(this.endGame, this);
    }

    update() {

    }

    endGame() {
        this.game.state.start('gameover');
    }

}

module.exports = Game
