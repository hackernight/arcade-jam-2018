const Boot = require('./src/states/boot')
const Game = require('./src/states/game')
const Menu = require('./src/states/menu')
const Gameover = require('./src/states/gameover')
const SplashScreen = require('./src/states/splashScreen')


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'arcade-jam-2018-game');

game.state.add('boot', new Boot());
game.state.add('splashScreen', new SplashScreen());
game.state.add('menu', new Menu());
game.state.add('game', new Game());
game.state.add('gameover', new Gameover());

game.state.start('boot');
