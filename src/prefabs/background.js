const tileSize = 64

class Background extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0)
    this.width = game.width
    game.add.existing(this)

    new HayTile(game)
  }

  update() {}

}

class HayTile extends Phaser.TileSprite {

  constructor(game) {
  console.log("here 1")
    var playerLane = (game.height) - 64 * 1;
    super(game, 0, Math.ceil(playerLane), game.width, game.height, 'hay-tile')
    game.add.existing(this)
  }

  update() {}

}



module.exports = Background
