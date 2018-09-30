const SPRITE_SIZE=128;
const MAX_SPEED = -700;
const ACCELERATION = 5;



//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class ThrownEgg extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
      super(game, x, y, 'eggie', 0);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.frame = 0;
      game.add.existing(this);
      this.body.velocity.y = MAX_SPEED;
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);

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
    if (!this.isSplattering){
    this.body.velocity.y  += ACCELERATION
    }
    this.angle = Math.sin(this.game.time.time * 1/50) * 5

  }

  splatter(){
    this.isSplattering = true;
    this.animations.play("splatter");
  }



}

module.exports = ThrownEgg;
