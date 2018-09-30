const SPRITE_SIZE=128;
const MAX_SPEED = -600;
const ACCELERATION = 5;



//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class LaidEgg extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
      super(game, x, y, 'egg', 0);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.frame = 0;
      game.add.existing(this);
      //this.body.velocity.y = MAX_SPEED;
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);

      //this.isSplattering = false;
      //this.animations.add('splatter', [1,2,3], 20, false);

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

  }


}

module.exports = LaidEgg;
