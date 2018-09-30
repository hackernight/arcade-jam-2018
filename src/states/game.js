//import TRex from '../prefabs/trex'
const TRex = require('../prefabs/trex');
const UFO = require('../prefabs/ufo');
const EggedCounter = require('../prefabs/eggedCounter')
const ChickenCounter = require('../prefabs/chickenCounter')
const ThrownEgg = require('../prefabs/thrownEgg')
const LaidEgg = require('../prefabs/laidEgg')
const Chicken = require('../prefabs/chicken')
const AbductionBeam = require('../prefabs/AbductionBeam')
const AmmoEggCounter = require('../prefabs/ammoEggCounter')
const Background = require('../prefabs/Background')
//const style = require('../fontStyle');

var flyingEggs = [];
var laidEggs = [];
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
var eggCount;
var dinoAmmo;
var inEndState;

class Game extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    constructor() {
        super();
    }

    create() {

      console.log("here 0")
        new Background(this.game)

        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        text.anchor.set(0.5);
        inEndState = false;

        var height = this.game.height
        playerLaneY = height - 50;
        playerLaneY2 = (height / 3) + 32 * 2.5
        chickenLane = playerLaneY - 50; //need to change this later

        gordie = new TRex(this.game, playerLaneY, 0);
        roswell = new UFO(this.game, this.game.width - 100, playerLaneY2, 0);

        UFObeam = new AbductionBeam(this.game, playerLaneY, 0, roswell.width);
        roswell.addChild(UFObeam);
        UFObeam.x=0;
        UFObeam.y=0;
        UFObeam.anchor.y = 0;
        UFObeam.visible = false;

        dinoAmmo = 0;
        chickenCount = 5;

        //make sure to reset arrays in case the game gets replayed
        chickens = [];
        laidEggs = [];
        flyingEggs = [];
        for (let i =0; i<chickenCount; i++){
          var chicken = new Chicken(this.game, this.game.rnd.integerInRange(50, this.game.width-50), chickenLane, 0);
          console.log("chicken body " + chicken.body.x);
          chickens.push(chicken);
          console.log("number of chickens: " + chickens.length);
        }
        eggCount = 5;
        this.queueEgg(eggCount);


        eggHitLimit = 5;
        eggHitCounter = 0;
        this.eggedCounter = new EggedCounter(this.game, eggHitLimit)
        this.chickenCounter = new ChickenCounter(this.game, chickenCount)
        this.AmmoEggCounter = new AmmoEggCounter(this.game)

        game.global.input.bindOnDown('one', 'a', this.throwEgg, this)
        game.global.input.bindOnDown('two', 'a', this.abductChicken, this)
        game.global.input.bindOnDown('one', 'b', this.throwEgg, this)
        game.global.input.bindOnDown('two', 'b', this.abductChicken, this)
        this.input.onDown.add(this.endGame, this);

        this.game.TRexWon = false;
        this.game.UFOWon = false;
    }

    update() {
      if (inEndState){
          if (this.game.TRexWon){
            roswell.body.velocity.y  += 100
            roswell.angle = Math.sin(this.game.time.time * 1/10) * 5
          }
          if (this.game.UFOWon){
            roswell.body.velocity.y  -= 10
            roswell.angle = Math.sin(this.game.time.time * 1/10) * 5
          }

      }

      for (const egg of flyingEggs) {
        this.game.physics.arcade.collide(roswell, egg, this.collisionHandler, null, this)
      //  this.game.physics.arcade.collide(gordie, egg, this.pickupCollisionHandler, null, this)
      }
      for (const egg of laidEggs) {
        this.game.physics.arcade.collide(gordie, egg, this.pickupCollisionHandler, null, this)
      }
      for (const chicken of chickens) {
        this.game.physics.arcade.collide(roswell, chicken, this.abductionCollisionHandler, null, this)
      }

      //abductionCollisionHandler

      var needToDestroyBeam = true;
      for (const chicken of chickens){
        var EligibleToAbduct = (chicken != null && chicken.body != null && ((roswell.body.x  < chicken.body.x) &&
               (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width)));

         if (chicken.isAbducting && !EligibleToAbduct){
           chicken.isAbducting = false;
         }

         if (chicken.isAbducting){
           needToDestroyBeam = false;
         }


      }

      if (needToDestroyBeam && UFObeam !=null){
        UFObeam.stopBeam();
        UFObeam.visible = false;
      }



    }

queueEgg(eggCount) {
  if (inEndState){return;}

  for (let i =0; i<eggCount; i++){
    var egg = new LaidEgg(this.game, this.game.rnd.integerInRange(50, this.game.width-50), playerLaneY, 0);
    laidEggs.push(egg);
    console.log("number of eggs: " + laidEggs.length);
  }
}

  collisionHandler(roswell, egg) {
    if (inEndState){return;}

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

  pickupCollisionHandler(gordie, egg){
    dinoAmmo++;
    this.AmmoEggCounter.updateCount(dinoAmmo);
    egg.destroy();
  }

    throwEgg(){
      if (inEndState){return;}

      if (dinoAmmo > 0){
        gordie.throwEggAnimation();
        dinoAmmo--;
        this.AmmoEggCounter.updateCount(dinoAmmo);
        const flyingEgg = new ThrownEgg(this.game, gordie.x, gordie.y);
       flyingEggs.push(flyingEgg);
     }
    }

    abductChicken(){
      if (inEndState){return;}

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
      console.log("adding beam");
      UFObeam.visible = true;
      UFObeam.expandBeam();
      //game.time.events.add(Phaser.Timer.SECOND * 3, this.finishAbduction, this);
    }


      abductionCollisionHandler(roswell, abductedchicken){

          if (inEndState){return;}

          for (let i=chickens.length-1; i>=0; i--){
            let chicken = chickens[i];
            if (chicken.isAbducting && chicken.body.x == abductedchicken.body.x &&
                chicken.body.y == abductedchicken.body.y){
              roswell.body.velocity.y=0; //don't push the chicken away
              chicken.destroy();
              chickens.splice(i,1);
              this.chickenCounter.updateCount(chickens.length);
            }
          }


          if (chickens.length == 0){
            this.game.TRexWon = false;
            this.game.UFOWon = true;
            this.endGame();
          }
      }

    endGame() {
        inEndState = true;
        const timer = this.game.time.create(false)
        timer.add(Phaser.Timer.SECOND * 1.5, () => {
          this.game.state.start('gameover');
        })
        timer.start();

    }

}

module.exports = Game
