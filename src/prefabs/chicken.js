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


      //this.anchor.setTo(.5);
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
  }

  ChangeDirection(){
    let action = game.math.roundTo(this.game.rnd.integerInRange(1,3), 0)


    if (action==1){
        this.body.velocity.x=this.body.velocity.x * -1;
        this.scale.x *= -1;
    }


  }


  //Code ran on each frame of game
  update() {

  //if being abducted, we rise
  if (this.isAbducting && this.body.velocity.y > -100){
    this.body.velocity.y -= 5;

  }
  //console.log("chicken body y: " + this.body.y  + "chicken groundlevely: " + this.groundLevely)
//  if we're above the ground, we fall
  if (!this.isAbducting && this.body.y < this.groundLevely){
    this.body.velocity.y += 20;
  }
//  if we've hit the ground, we stop
  if (!this.isAbducting && this.body.velocity.y !=0 && this.body.y >= this.groundLevely){
    this.body.velocity.y = 0;
    this.body.y = this.groundLevely;
  }

  if (this.right < 0 ){
    this.body.velocity.x = current_speed * -1
    this.scale.x *= -1;

  }
  else if(this.left > this.game.width - this.width) {
    this.body.velocity.x = current_speed
    this.scale.x *= -1;

  }

  }



}

module.exports = Chicken;
