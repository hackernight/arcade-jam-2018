const CenteredSprite = require('../prefabs/centeredSprite');

class SplashScreen extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    loadResources() {
        // load your resources here
    }

    preload() {
        // Load only resources used on this state
        // Use this time to preload resources for the game by using the loadResources function
        this.load.image('logo-stl', 'assets/logos/stl.png');
        this.load.spritesheet('logo-studio', 'assets/logos/studio.png', 128, 128);

        // setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    async create() {
        // Will start asynchronously loading assets
        this.loadResources();

        await this.showStlSplash()
        this.animateJ2FLogo()

    }

    async showStlSplash(callback) {
        const splash = new CenteredSprite(this.game, 'logo-stl');
        splash.alpha = 0;
        const millisToLeaveOnScreen = 1500
        return new Promise((resolve) => {
            const tween = this.game.add.tween(splash).to({
                    alpha: 1
                },
                150,
                Phaser.Easing.Linear.In,
                true
            ).yoyo(true, millisToLeaveOnScreen);

            tween.onComplete.add(() => {resolve()});
        });
    }

    animateJ2FLogo() {
        const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo-studio');
        logo.anchor.set(0.5);
        logo.scale.set(2);

        logo.animations.add('logo');
        return logo.animations.play('logo', 30, false);

        animation.onComplete.add(() => {
            const style = {
                font: '42px Arial',
                fill: '#ffffff',
                stroke: 0x333333,
                strokeThickness: 5,
                align: 'center'
            };
            const text = this.game.add.text(this.game.world.centerX, 100, 'Jokes Too Far Games', style);
            text.alpha = 0;
            text.anchor.set(0.5);
            const txtTween = this.game.add.tween(text).to({
                    alpha: 1
                },
                150,
                Phaser.Easing.Linear.In,
                true
            );

            txtTween.onComplete.add(this.moveToNextState, this);
        });
    }

    moveToNextState() {
        this.game.state.start('menu')
    }

    onLoadComplete() {
        this.game.global.input.bindOnDown('one', 'a', this.moveToNextState, this)
        this.game.global.input.bindOnDown('one', 'b', this.moveToNextState, this)
        this.game.global.input.bindOnDown('two', 'a', this.moveToNextState, this)
        this.game.global.input.bindOnDown('two', 'b', this.moveToNextState, this)

        // mouse click for ezpz testing
        this.input.onDown.add(this.moveToNextState, this);
    }
}

module.exports = SplashScreen;
