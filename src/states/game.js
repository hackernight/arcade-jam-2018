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
const EggLimit = 2;
var ufoStunned;

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

        inEndState = false;

        var height = this.game.height
        playerLaneY = height - 50;
        playerLaneY2 = (height / 3) + 32 * 2.5
        chickenLane = playerLaneY - 50; //need to change this later

        gordie = new TRex(this.game, playerLaneY- 50, 0);
        roswell = new UFO(this.game, this.game.width - 100, playerLaneY2, 0);


        //game.debug.body(roswell);

        ufoStunned = false;
        UFObeam = new AbductionBeam(this.game, playerLaneY, 0, roswell.width);
        roswell.addChild(UFObeam);
        UFObeam.x=0;
        UFObeam.y=0;
        UFObeam.anchor.y = 0;
        UFObeam.visible = false;

        dinoAmmo = 1;
        chickenCount = 5;

        //make sure to reset arrays in case the game gets replayed
        chickens = [];
        laidEggs = [];
        flyingEggs = [];
        for (let i =0; i<chickenCount; i++){
          var chicken = new Chicken(this.game, this.game.rnd.integerInRange(50, this.game.width-50), chickenLane, 0);
          chickens.push(chicken);
        }
        this.queueEgg(EggLimit-dinoAmmo);


        eggHitLimit = 5;
        eggHitCounter = 0;
        this.eggedCounter = new EggedCounter(this.game, eggHitLimit)
        this.chickenCounter = new ChickenCounter(this.game, chickenCount)
        this.AmmoEggCounter = new AmmoEggCounter(this.game)
        this.AmmoEggCounter.updateCount(dinoAmmo);

        game.global.input.bindOnDown('one', 'a', this.throwEgg, this)
        game.global.input.bindOnDown('two', 'a', this.abductChicken, this)
        game.global.input.bindOnDown('one', 'b', this.throwEgg, this)
        game.global.input.bindOnDown('two', 'b', this.abductChicken, this)
        //this.input.onDown.add(this.endGame, this);
        game.time.events.loop(1000,this.ChickenMakeDecision,this);


        this.game.TRexWon = false;
        this.game.UFOWon = false;
    }

    // render(){
    //   game.debug.body(roswell);
    // }

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

        if (!inEndState){
          for (const egg of flyingEggs) {
          this.game.physics.arcade.collide(roswell, egg, this.collisionHandler, null, this)
          //  this.game.physics.arcade.collide(gordie, egg, this.pickupCollisionHandler, null, this)
          }
          for (const egg of laidEggs) {
          this.game.physics.arcade.collide(gordie, egg, this.pickupCollisionHandler, null, this)
          }
          for (const chicken of chickens) {
          this.game.physics.arcade.overlap(roswell, chicken, this.abductionCollisionHandler, null, this)
          }
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
      }



    }

queueEgg(eggCount) {
  if (inEndState){return;}

  for (let i =0; i<eggCount; i++){
    var egg = new LaidEgg(this.game, this.game.rnd.integerInRange(50, this.game.width-50), playerLaneY, playerLaneY);
    laidEggs.push(egg);
    console.log("number of eggs: " + laidEggs.length);
  }
}

  UFONotStunned(){
    ufoStunned = false;
  }

  collisionHandler(roswell, egg) {
    if (inEndState){return;}

    ufoStunned = true;
    game.time.events.add(Phaser.Timer.SECOND, this.UFONotStunned, this);
    egg.body.enable = false;
    egg.splatter();

    for(const chicken of chickens){
      chicken.isAbducting = false;
    }

    UFObeam.stopBeam();


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

  CanSpawnMoreEggs(){
    console.log("can we spawn eggs? " + laidEggs.length + " on ground, " + dinoAmmo + " ammo, limit " + EggLimit)
    return (laidEggs.length + dinoAmmo < EggLimit)

  }

  pickupCollisionHandler(gordie, egg){
    gordie.body.velocity.y=0;
    dinoAmmo++;
    this.AmmoEggCounter.updateCount(dinoAmmo);
    for (let i=laidEggs.length-1; i>=0; i--){
      let myegg = laidEggs[i];
      if (myegg.body !=null && egg.body !=null && myegg.body.x == egg.body.x &&
          myegg.body.y == egg.body.y){
        egg.destroy();
        laidEggs.splice(i,1);
      }
    }
  }

    throwEgg(){
      if (inEndState){return;}

      if (dinoAmmo > 0){
        gordie.throwEggAnimation();
        dinoAmmo--;
        this.AmmoEggCounter.updateCount(dinoAmmo);
        const flyingEgg = new ThrownEgg(
          this.game,
          gordie.x + (64 * (gordie.facing == 'left' ? -1 : 1)),
          gordie.y,
          50);
       flyingEggs.push(flyingEgg);
     }
    }

    abductChicken(){
      if (inEndState || ufoStunned){return;}

      let abductionValid = false;
      for(const chicken of chickens){
        console.log("chicken info:" + chicken);
        if ((roswell.body.x  < chicken.body.x) &&
          (roswell.body.x + roswell.body.width) > (chicken.body.x + chicken.body.width))
         {
           chicken.isAbducting = true;
           this.addAbductionBeam();
           abductionValid = true;
         }
      }

      if (!abductionValid){
        UFObeam.fizzleBeam();

      }

    }

    ChickenMakeDecision(){

      for(const chicken of chickens){

        let action = game.math.roundTo(this.game.rnd.integerInRange(1,10), 0)

        let chickenLaysEgg = action==3 ||
                (chickens.length <=2 && laidEggs.length + dinoAmmo <0 && (action >=3 || action <=4));

        //if being abducted, chicken is probably going to settle down
        if (chicken.isAbducting && action<3){action = 4;}

        if (chickens.length==1&& !chicken.isAbducting && action >=8){ action = 10}

        chicken.ChangeDirection(action);

        if (chickenLaysEgg && this.CanSpawnMoreEggs()){
          console.log("Chicken laid egg height " + chicken.body.y)
          var egg = new LaidEgg(this.game, chicken.body.x, chicken.body.y, playerLaneY);
          laidEggs.push(egg);
        }
      }

    }

    addAbductionBeam(){
      console.log("adding beam");
      UFObeam.expandBeam();
      //game.time.events.add(Phaser.Timer.SECOND * 3, this.finishAbduction, this);
    }


      abductionCollisionHandler(roswell, abductedchicken){

          if (inEndState || abductedchicken.body==null ){return;}

          for (let i=chickens.length-1; i>=0; i--){
            let chicken = chickens[i];
            if (chicken.isAbducting && chicken.body !=null && abductedchicken.body !=null && chicken.body.x == abductedchicken.body.x &&
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
