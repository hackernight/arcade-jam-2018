const SPRITE_SIZE=128;
const MAX_VELOCITY = 280;
const ACCELERATION = 25;
var space;

class UFO extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, frame) {
       y = y - (SPRITE_SIZE / 2)
       y = y - 150
      super(game, x, y, 'roswell', frame);
      console.log("Im the UFO!")
      game.physics.enable(this, Phaser.Physics.ARCADE);
      //this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);


      this.body.setSize(155, 70, 50, 20);

      this.animations.add('run', [0,1,2,3,4,5,6], 5, true);

        this.animations.play("run");
      //this.walkingSound = this.game.add.audio('walking')
      //this.walkingSound.volume = .3
      //this.digging = this.game.add.audio('digging')
      //this.facing = 'right';
      // Invert scale.x to flip left/right
      //this.scale.x *= -1;
  }

  //Code ran on each frame of game
  update() {
    this.bringToTop()
    if (this.game.global.input.player.two.left.isDown)
    {
      // if(!this.walkingSound.isPlaying){
      //   this.walkingSound.play()
      // }

      // if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
      //   this.animations.play("run");
      // }
      this.body.velocity.x -= ACCELERATION
      this.body.velocity.x = Math.max(this.body.velocity.x, -MAX_VELOCITY)
    }
    else if (this.game.global.input.player.two.right.isDown)
    {

      // if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
      //   this.animations.play("run");
      // }
      this.body.velocity.x += ACCELERATION
      this.body.velocity.x = Math.min(this.body.velocity.x, MAX_VELOCITY)
    }
    else
    {
        if (this.body.velocity.x > 0) {
          this.body.velocity.x -= ACCELERATION
        } else if (this.body.velocity.x < 0) {
          this.body.velocity.x += ACCELERATION
        }
        if (Math.abs(this.body.velocity.x) < ACCELERATION){
          this.body.velocity.x = 0;
        }
    }
    let rightBorder = this.body.width;

    if (this.body.x <= 0 || this.body.x >= (this.game.width - rightBorder)) {
      if (this.body.x <= 0) {this.body.x = 1;}
      if (this.body.x >= this.game.width - rightBorder){this.body.x = (this.game.width - this.body.width) -1;}
      this.body.velocity.x = 0;
    }

  }

  startBuilding(){

    this.body.velocity.x = 0
    this.animations.play("build");
    if(!this.digging.isPlaying){
      this.digging.play()
    }
  }


}

module.exports = UFO;
