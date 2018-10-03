const CenteredSprite = require('../prefabs/centeredSprite');
const FlashingText = require('../prefabs/FlashingText');


class SplashScreen extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    loadResources() {
        // load your resources here
        this.game.load.spritesheet('gordon', 'assets/trex.png', 128, 64)
        this.game.load.spritesheet('roswell', 'assets/ufo.png', 256, 128)
        this.game.load.spritesheet('eggie', 'assets/egg.png', 32, 32)
        this.game.load.spritesheet('egg', 'assets/egg.png', 32, 32)
        this.game.load.spritesheet('chicken', 'assets/chicken.png', 64, 64)
        this.game.load.spritesheet('beam', 'assets/beam.png', 64, 64)
        this.game.load.image('hay-tile', 'assets/ground-hay.png')
        this.game.load.image('night-sky', 'assets/night-sky.png')
    }

    preload() {
        // Load only resources used on this state
        // Use this time to preload resources for the game by using the loadResources function
        this.load.image('logo-stl', 'assets/logos/stl.png');
        this.load.spritesheet('logo-studio', 'assets/logos/studio.png', 128, 128);

        // Will start asynchronously loading assets
        this.loadResources();

        // setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    async create() {
        await this.showStlSplash()
        await this.animateJ2FLogo()
        await this.showJ2FText()

        this.moveToNextState()
    }

    showStlSplash(callback) {
        const splash = new CenteredSprite(this.game, 'logo-stl');
        splash.alpha = 0;
        const tweenTime = 150
        const millisToLeaveOnScreen = 1500
        const tween = this.game.add.tween(splash).to({
                alpha: 1
            },
            tweenTime,
            Phaser.Easing.Linear.In,
            true
        ).yoyo(true, millisToLeaveOnScreen);
        return new Promise((resolve) => {
            tween.onComplete.add(() => resolve());
        });
    }

    animateJ2FLogo() {
        const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo-studio');
        logo.anchor.set(0.5);
        logo.scale.set(2);

        logo.animations.add('logo');
        const fps = 30
        const shouldLoopAnimation = false
        const animation = logo.animations.play('logo', fps, shouldLoopAnimation);

        return new Promise((resolve, reject) => {
            animation.onComplete.add(() => resolve());
        });
    }

    showJ2FText() {
        const style = {
            font: '42px Gameplay',
            fill: '#ffffff',
            stroke: 0x333333,
            strokeThickness: 5,
            align: 'center'
        };
        const text = this.game.add.text(this.game.world.centerX, 100, 'Jokes Too Far Games', style);
        text.alpha = 0;
        text.anchor.set(0.5);
        const tweenTime = 1500
        const txtTween = this.game.add.tween(text).to({
                alpha: 1
            },
            tweenTime,
            Phaser.Easing.Linear.In,
            true
        );

        return new Promise((resolve, reject) => {
            txtTween.onComplete.add(() => resolve());
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
        new FlashingText(this.game, this.game.world.centerX, this.game.height, 'Press to continue')
    }
}

module.exports = SplashScreen;
