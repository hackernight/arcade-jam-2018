const fontStyle = require('../fontStyle');

class FlashingText extends Phaser.Text {

    constructor(game, x, y, text, styleOverrides) {
        const localFontStyle = Object.assign({}, fontStyle, styleOverrides)
        super(game, x, y, text, localFontStyle);

        this.anchor.setTo(0.5, 1)

        game.add.existing(this)
    }

    update() {
        const scale = 0.02 * Math.sin(new Date() / 200)
        this.scale.setTo(1 + scale, 1 + scale)
    }

}
module.exports = FlashingText;
