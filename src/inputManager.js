class InputManager {

    constructor(game) {
        this.player = {
            one: {
                up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
                down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
                left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
                right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
                a: game.input.keyboard.addKey(Phaser.Keyboard.PERIOD),
                b: game.input.keyboard.addKey(Phaser.Keyboard.QUESTION_MARK),
            },
            two: {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
                a: game.input.keyboard.addKey(Phaser.Keyboard.TILDE),
                b: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
            },
            quit: game.input.keyboard.addKey(Phaser.Keyboard.ESC)
        }
    }

    bindOnDown(player, button, action, context) {
        this.player[player][button].onDown.add(action, context)
    }
}

module.exports = InputManager
