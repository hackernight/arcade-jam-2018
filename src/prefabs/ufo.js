const SPRITE_SIZE=128;
const MAX_VELOCITY = 250;
const ACCELERATION = 25;
var space;

class UFO extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, y, frame) {
      y = y - (SPRITE_SIZE / 2)
      y = y - 150
      super(game, SPRITE_SIZE, y, 'roswell', frame);
      console.log("Im the UFO!")
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);

      this.animations.add('run', [0,1,2,3,4,5,6], 20, false);
      this.animations.add('build', [8,9,10,11,12,13,14,15,8,9,10,11,12,13,14,15], 30, false);
      this.walkingSound = this.game.add.audio('walking')
      this.walkingSound.volume = .3
      this.digging = this.game.add.audio('digging')
      this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
  }

  //Code ran on each frame of game
  update() {
    this.bringToTop()
    if (this.animations.currentAnim.name =="build" && this.animations.currentAnim.isPlaying==true){
      //console.log('current anim: ', this.animations.currentAnim.name, ', isplaying = ', this.animations.currentAnim.isPlaying)
      return;
    } else {
      this.digging.stop()
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      if(!this.walkingSound.isPlaying){
        this.walkingSound.play()
      }

      if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
        this.animations.play("run");
      }

      if (this.facing == 'right'){
        // Invert scale.x to flip left/right
        this.scale.x *= -1;
        this.facing = 'left';
      }
      this.body.velocity.x -= ACCELERATION
      this.body.velocity.x = Math.max(this.body.velocity.x, -MAX_VELOCITY)
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      if(!this.walkingSound.isPlaying){
        this.walkingSound.play()
      }

      if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
        this.animations.play("run");
      }
      if (this.facing == 'left'){
        // Invert scale.x to flip left/right
        this.scale.x *= -1;
        this.facing = 'right';
      }

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
    }
    if (this.left < 0 || this.right > this.game.width + this.width) {
      this.body.velocity.x = 0
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