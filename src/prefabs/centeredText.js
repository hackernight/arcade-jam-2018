const fontStyle = require('../fontStyle');

class CenteredText extends Phaser.Text {

    constructor(game, y, text, styleOverrides) {
        const localFontStyle = Object.assign({}, fontStyle, styleOverrides)
        super(game, game.world.centerX, y, text, localFontStyle);

        this.anchor.setTo(0.5)

        game.add.existing(this)
    }

    update() {}

}
module.exports = CenteredText;
