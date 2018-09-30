const SPRITE_SIZE=128;
const MAX_SPEED = -900;
const ACCELERATION = 5;
const MAX_DRAG = 50;


//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class ThrownEgg extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, maxthrowHeight) {
      super(game, x, y, 'eggie', 0);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.frame = 0;
      game.add.existing(this);
      this.body.velocity.y = -this.game.height*.75;
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);
      this.throwHeight = maxthrowHeight;
      console.log("maxthrowheight= " + maxthrowHeight + ", throwheight = " + this.throwHeight)
      this.drag = this.game.height/200;

      this.isSplattering = false;
      this.animations.add('splatter', [1,2,3], 20, false);

      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')
      //this.facing = 'right';
      // Invert scale.x to flip left/right
      //this.scale.x *= -1;
      // game.global.input.bindOnDown('one', 'left', this.moveLeft, this)

  }

  //Code ran on each frame of game
  update() {
    if (!this.isSplattering && this.body.y > 0){
      this.body.velocity.y  += this.drag;
    }

    //increase drag if we're close to the topping-off area and going up

    if (this.body.y < 50 && this.body.velocity.y < 0 && this.drag < MAX_DRAG){
        this.drag = this.drag * 2;
        console.log("applying drag " + this.drag)
    }

    if (this.body.y > 25 && this.body.velocity.y > 0 && this.drag > 5){
        this.drag = this.game.height/200;
    }

    this.angle = Math.sin(this.game.time.time * 1/50) * 5

  }

  splatter(){
    this.isSplattering = true;
    this.animations.play("splatter");
  }



}

module.exports = ThrownEgg;
