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
var chickens = [];
var playerLaneY;
var playerLaneY2;
var chickenLane;
var gordie;
var roswell;
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
        chickenLane = 700; //need to change this later

        gordie = new TRex(this.game, playerLaneY, 0);
        roswell = new UFO(this.game, playerLaneY2, 0);
        chickenCount = 5;

        for (let i =0; i<chickenCount; i++){
          var chicken = new Chicken(this.game, this.game.rnd.integerInRange(50, this.game.width-50), chickenLane, 0);
          console.log("chicken body " + chicken.body.x);
          chickens.push(chicken);
          console.log("number of chickens: " + chickens.length);
        }

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

      for (const chicken of chickens){
        var EligibleToAbduct = (chicken != null && chicken.body != null && ((roswell.body.x  < chicken.body.x) &&
               (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width)));

         if (chicken.isAbducting && !EligibleToAbduct){
           chicken.isAbducting = false;
           UFObeam.destroy();
         }

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
      for(const chicken of chickens){
        console.log("chicken info:" + chicken);
        if ((roswell.body.x  < chicken.body.x) &&
          (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width))
         {
           chicken.isAbducting = true;
           this.addAbductionBeam();
         }
      }

    }

    addAbductionBeam(){

      UFObeam = new AbductionBeam(this.game, playerLaneY, 0, roswell.width);
      roswell.addChild(UFObeam);
      UFObeam.x=0;
      UFObeam.y=0;
      UFObeam.anchor.y = 0;
      UFObeam.expandBeam();
      game.time.events.add(Phaser.Timer.SECOND * 3, this.finishAbduction, this);
    }

    finishAbduction(){
      for (let i=chickens.length-1; i>=0; i--){
        let chicken = chickens[i];
        if (chicken.isAbducting){
          console.log("destroyed chicken");
          chicken.destroy();
          chickens.splice(i,1);
        }
      }


      if (chickens.length == 0){
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
