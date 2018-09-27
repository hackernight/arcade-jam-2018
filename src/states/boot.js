class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.image('logo-stl', 'assets/logos/stl.png');
    this.load.spritesheet('logo-studio', 'assets/logos/studio.png', 128, 128);
  }

  create() {
    this.game.input.maxPointers = 1;

    //setup device scaling
    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setSize();
    }

    this.initGlobalVariables();

    this.game.state.start('splashScreen');
  }

  initGlobalVariables(){
    this.game.global = {

    };
  }

}

module.exports = Boot
