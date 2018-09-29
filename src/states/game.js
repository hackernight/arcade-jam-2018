//import TRex from '../prefabs/trex'
const TRex = require('../prefabs/trex');
const UFO = require('../prefabs/ufo');
const EggedCounter = require('../prefabs/eggedCounter')
const ChickenCounter = require('../prefabs/chickenCounter')
const ThrownEgg = require('../prefabs/thrownEgg')
const Chicken = require('../prefabs/chicken')
const AbductionBeam = require('../prefabs/AbductionBeam')
//const style = require('../fontStyle');

var flyingEggs = [];
var playerLaneY;
var playerLaneY2;
var gordie;
var roswell;
var chicken;
var eggHitCounter;
var eggHitLimit;
var isAbducting;
var UFObeam;
var chickenCount;

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
        chicken = new Chicken(this.game, playerLaneY, 0);
        chickenCount = 1;

        eggHitLimit = 5;
        eggHitCounter = 0;
        this.eggedCounter = new EggedCounter(this.game, eggHitLimit)
        this.chickenCounter = new ChickenCounter(this.game)

        game.global.input.bindOnDown('one', 'a', this.throwEgg, this)
        game.global.input.bindOnDown('two', 'a', this.abductChicken, this)
        this.input.onDown.add(this.endGame, this);

        this.game.TRexWon = false;
        this.game.UFOWon = false;
    }

    update() {
      for (const egg of flyingEggs) {
        this.game.physics.arcade.collide(roswell, egg, this.collisionHandler, null, this)
      }

      var EligibleToAbduct = chicken != null && chicken.body != null && ((roswell.body.x  < chicken.body.x) &&
             (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width));

      if (isAbducting && !EligibleToAbduct){
        isAbducting = false;
        UFObeam.destroy();
      }
    }


  collisionHandler(roswell, egg) {
    egg.body.enable = false;
    egg.splatter();

    // make egg move with Roswell
    egg.body.velocity.y = 0;
    roswell.addChild(egg);
    eggHitCounter +=1;
    var xSliceLength = roswell.body.width/(eggHitLimit + 1);
    egg.x = ((xSliceLength * eggHitCounter) + this.game.rnd.integerInRange(0,5)) - (roswell.body.width/2);
    egg.y = this.game.rnd.integerInRange(0, roswell.body.height/4) - (roswell.body.height/4);
    roswell.body.velocity.y = 0;
    //reset the candy position relative to Ralph

    //egg.velocity =0;
    this.eggedCounter.updateCount(eggHitCounter);
    if (eggHitCounter == eggHitLimit){
      this.game.TRexWon = true;
      this.game.UFOWon = false;
      this.endGame();
    }
  }

    throwEgg(){
      const flyingEgg = new ThrownEgg(this.game, gordie.x, gordie.y);
     flyingEggs.push(flyingEgg);
    }

    abductChicken(){
      if ((roswell.body.x  < chicken.body.x) &&
       (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width))
       {
         isAbducting = true;
         UFObeam = new AbductionBeam(this.game, playerLaneY, 0);
         roswell.addChild(UFObeam);
         UFObeam.x=0;
         UFObeam.y=0;
         game.time.events.add(Phaser.Timer.SECOND * 3, this.finishAbduction, this);
       }
    }

    finishAbduction(){
      if (isAbducting){
        chicken.destroy();
        this.game.TRexWon = false;
        this.game.UFOWon = true;
        this.endGame();
      }
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

module.exports = Game
