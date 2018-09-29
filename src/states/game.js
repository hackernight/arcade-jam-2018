//import TRex from '../prefabs/trex'
const TRex = require('../prefabs/trex');
const UFO = require('../prefabs/ufo');
const EggedCounter = require('../prefabs/eggedCounter')
const ChickenCounter = require('../prefabs/chickenCounter')
const ThrownEgg = require('../prefabs/thrownEgg')
const Chicken = require('../prefabs/chicken')
//const style = require('../fontStyle');

var flyingEggs = [];
var playerLaneY;
var playerLaneY2;
var gordie;
var roswell;
var chicken;
var eggHitCounter;
var eggHitLimit;

class Game extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    constructor() {
        super();
    }

    create() {
        game.stage.backgroundColor = "#213ad1";

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
        chicken = new Chicken(this.game, playerLaneY, 0);

        eggHitLimit = 5;
        eggHitCounter = 0;
        this.eggedCounter = new EggedCounter(this.game, eggHitLimit)
        this.chickenCounter = new ChickenCounter(this.game)

        game.global.input.bindOnDown('one', 'a', this.throwEgg, this)


        this.input.onDown.add(this.endGame, this);
    }

    update() {
      for (const egg of flyingEggs) {
        this.game.physics.arcade.collide(roswell, egg, this.collisionHandler, null, this)
      }
    }


  collisionHandler(roswell, egg) {
    egg.body.enable = false;
    egg.splatter();

    // make egg move with Roswell
    egg.body.velocity.y = 0;
    roswell.addChild(egg);
    egg.x = 0;
    egg.y = 0;
    roswell.body.velocity.y = 0;
    //reset the candy position relative to Ralph

    //egg.velocity =0;
    eggHitCounter +=1;
    this.eggedCounter.updateCount(eggHitCounter);
    if (eggHitCounter == eggHitLimit){
      this.endGame();
    }
  }

    throwEgg(){
      const flyingEgg = new ThrownEgg(this.game, gordie.x, gordie.y);
     flyingEggs.push(flyingEgg);
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

module.exports = Game
