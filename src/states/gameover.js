class Menu extends Phaser.State {

    init() {
        this.game.global.input.bindQuit()
    }

    create() {
        const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Gameover', {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        text.anchor.set(0.5);

        this.input.onDown.add(this.restartGame, this);
    }

    update() {}

    restartGame() {
        this.game.state.start('menu');
    }

}

module.exports = Menu
