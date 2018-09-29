const SPRITE_SIZE=128;
const MAX_VELOCITY = 250;
const ACCELERATION = 25;
var current_speed = -400;

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Chicken extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    y =700;
    x = 500;

    super(game, x, y, 'chicken', frame);
    console.log("I AM CHICK-CHICK-CHICKEN!")
      //super(game, x, y, 'chicken');
      game.physics.enable(this, Phaser.Physics.ARCADE);
      //this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);
      this.body.velocity.x = current_speed
      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')
      //this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
      // game.global.input.bindOnDown('one', 'left', this.moveLeft, this)
  }


  //Code ran on each frame of game
  update() {

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
