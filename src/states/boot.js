const InputManager = require('../InputManager');

class Boot extends Phaser.State {

    preload() {}

    create() {
        this.game.input.maxPointers = 1;

        this.game.scale.pageAlignHorizontally = true;

        this.initializeFonts(['BirdFeather', 'Dino', 'Arcade', 'Gameplay', 'Emoji'])
        this.initGlobalVariables();
        this.game.global.input.bindQuit()

        this.game.state.start('splashScreen');
    }

    initGlobalVariables() {
        this.game.global = {
            input: new InputManager(this.game)
        };
    }

    // This gives the browser a hint to start loading these fonts so that they'll be ready in time
    initializeFonts(fonts) {
        for (const font of fonts) {
            this.add.text(0, 0, "", {font: `1px ${font}`});
        }
    }

}

module.exports = Boot
