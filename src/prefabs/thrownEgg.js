const SPRITE_SIZE=128;
const MAX_VELOCITY = 250;
const ACCELERATION = 25;

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class ThrownEgg extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y) {
      super(game, x, y, 'thrownEgg');
      game.physics.enable(this, Phaser.Physics.ARCADE);
      //this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);

      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')
      this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
      // game.global.input.bindOnDown('one', 'left', this.moveLeft, this)
  }

  //Code ran on each frame of game
  update() {
  }



}

module.exports = ThrownEgg;