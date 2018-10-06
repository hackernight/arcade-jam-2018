
const FeatherEmitter = require('../prefabs/featherEmitter')

const SPRITE_SIZE=128;
const MAX_VELOCITY = 50;
const ACCELERATION = 25;
var current_speed = -100;

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Chicken extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    //y =700;
    //x = 500;

    super(game, x, y, 'chicken', frame);
    console.log("I AM CHICK-CHICK-CHICKEN!")
    //super(game, x, y, 'chicken');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.isAbducting = false;
    //this.frame = 0;
    game.add.existing(this);

//sound import
    this.abductionSound = this.game.add.audio('chicken-capture')
    this.abductionSound.volume = 1
    this.idleSound = this.game.add.audio('chicken-single-cluck')
    this.idleSound.volume = .3
    this.eggLaySound = this.game.add.audio('chicken-double-cluck')
    this.eggLaySound.volume = 1
//

    this.featherEmitter = new FeatherEmitter(this.game, 0, 0);
    this.addChild(this.featherEmitter);

    this.anchor.setTo(.5);
    this.groundLevely = this.body.y;
    // Set Anchor to the center of your sprite
    this.body.velocity.x = current_speed
    //this.walkingSound = this.game.add.audio('walking')
    //this.walkingSound.volume = .3
    //this.digging = this.game.add.audio('digging')
    //this.facing = 'right';
    // Invert scale.x to flip left/right
    this.scale.x *= -1;
    // game.global.input.bindOnDown('one', 'left', this.moveLeft, this)
    this.animations.add('run', [0,1,2,3,4,5,6,7], 20, false);
  }

  IdleCluck(){
    if(!this.idleSound.isPlaying){
      this.idleSound.play()
    }
  }

  ChangeDirection(action){

    if (action>=1 && action<=2){
      //change direction
        if (this.body.velocity.x==0){
          if (this.scale.x < 0){
            this.body.velocity.x = current_speed;
          }
          else {
            this.body.velocity.x = -current_speed;
          }
        }
        this.body.velocity.x=this.body.velocity.x * -1;
        this.scale.x *= -1;

        //and cluck, because you just thought of something that made you return
        const timer = this.game.time.create(false)
        let delay = game.math.roundTo(this.game.rnd.integerInRange(1,5), 0) * 0.1

        timer.add(Phaser.Timer.SECOND * delay, () => {
          this.IdleCluck();
        })
        timer.start();



    }
    if (action>=3 && action <=5){
      //stop
      this.body.velocity.x = 0;
    }
    if (action >=6 && action <=9){
      //resume/continue in the direction you were going
      if (this.body.velocity.x==0){
        if (this.scale.x < 0){
          this.body.velocity.x = current_speed;
        }
        else {
          this.body.velocity.x = -current_speed;
        }
      }
    }
    if (action==10){
      this.body.velocity.x = this.body.velocity.x * 2;
    }


  }

//Spray some feathers when eggs are laid
  emitFeathers(){
    //this.featherEmitter.start(false, 1000, 10, 20)
    this.featherEmitter.start(true, 1000, null, 30)
    if(!this.eggLaySound.isPlaying){
      this.eggLaySound.play()
    }

  }

  startAbducting(){
    this.isAbducting = true;
    this.featherEmitter.start(true, 250, null, 5)
    //chicken-capture

    if(!this.abductionSound.isPlaying){
      this.abductionSound.play()
    }

  }

  //Code ran on each frame of game
  update() {

    // if (!this.isAbducting){
    //   this.featherEmitter.on = false;
    // }

    //if being abducted, we rise
    if (this.isAbducting && this.body.velocity.y > -(this.game.height*.75)){
      this.body.velocity.y -= this.game.height/400;

    }
    //console.log("chicken body y: " + this.body.y  + "chicken groundlevely: " + this.groundLevely)
    //  if we're above the ground, we fall
    if (!this.isAbducting && this.body.y < this.groundLevely){
      this.body.velocity.y += this.game.height/100;
    }
    //  if we've hit the ground, we stop
    if (this.body.velocity.y >0 && this.body.y >= this.groundLevely){
      this.body.velocity.y = 0;
      this.body.y = this.groundLevely;
    }

    if (this.right < 0 ){
      this.body.velocity.x = current_speed * -1
      this.scale.x *= -1;

    }
    else if (this.left > this.game.width - this.width) {
      this.body.velocity.x = current_speed
      this.scale.x *= -1;

    }

    if (this.body.velocity.x != 0) {
        this.animations.play('run')
    }

  }



}

module.exports = Chicken;
