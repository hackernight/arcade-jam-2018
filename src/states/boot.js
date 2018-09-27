const InputManager = require('../InputManager');

class Boot extends Phaser.State {

    preload() {}

    create() {
        this.game.input.maxPointers = 1;

        this.game.scale.pageAlignHorizontally = true;

        this.initGlobalVariables();
        this.game.global.input.bindQuit()

        this.game.state.start('splashScreen');
    }

    initGlobalVariables() {
        this.game.global = {
            input: new InputManager(this.game)
        };
    }

}

module.exports = Boot
