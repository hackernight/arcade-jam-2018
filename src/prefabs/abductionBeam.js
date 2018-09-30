const SPRITE_SIZE=128;
const MAX_SPEED = -90;
const ACCELERATION = 2;



//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class AbductionBeam extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, width) {
      super(game, x, y, 'beam', 0);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      //beam = game.add.tilemap();
      this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);
      this.height = this.game.height;
      this.width = width;

      this.alpha = 0.7;

      this.animations.add('expand', [0,1,2,3], 20, false);
      this.animations.add('sparkle', [2,3,4,5,6], 20, true);
      this.animations.add('fizzle', [0,1], 20, false);
      //this.animations.add('build', [8,9,10,11,12,13,14,15,8,9,10,11,12,13,14,15], 30, false);
      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')

      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')
      //this.facing = 'right';
      // Invert scale.x to flip left/right
      //this.scale.x *= -1;
      // game.global.input.bindOnDown('one', 'left', this.moveLeft, this)

  }
      fizzleBeam(){
        console.log("fizzling beam");
        this.visible = true;
        this.animations.play("fizzle");
      }

    expandBeam(){
      this.visible = true;
      this.animations.play("expand");
      this.animations.play("sparkle", 15, true);
    }

    stopBeam(){
      if ((this.animations.currentAnim.name =="expand" ||this.animations.currentAnim.name =="sparkle") &&
          this.animations.currentAnim.isPlaying==true){
          this.animations.stop();
      }
      if (!this.animations.currentAnim.isPlaying==true){
        this.visible = false;
      }

    }

  //Code ran on each frame of game
  update() {

  }



}

module.exports = AbductionBeam;
