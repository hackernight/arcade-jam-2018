class FeatherEmitter extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    //console.log('going to y', y);
    super(game, x, y, 20)
    this.makeParticles('feather')
    this.setAlpha(0.1, 0.5);
  }

  update() {}

}

module.exports = FeatherEmitter;
