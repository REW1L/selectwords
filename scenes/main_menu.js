
define(['Phaser', 'gameobjects/round_button'], function(Phaser, RoundButton) {

  var MainMenu = class extends Phaser.Scene {
    constructor (key, startScene=null) {
      // first text
      super({'key': key});
      this.startScene = startScene;
      this.score = 0;
    }

    preload () {
      // load all before creating anything
      // this: scene
    }

    create () {
      // called after loading
      // this: scene
      document.body.style.backgroundColor = "#0BC3E6";
      this.cameras.main.setBackgroundColor('#0BC3E6');

      this.input.enabled = true;
      this.btnNewGame = new RoundButton(this, 100, 300, 300, 150, 'New game',
                                        0x008C0A);
      // this.btnNewGame.text.setSize(100);
      this.btnNewGame.addListener('pointerup',
                                   this.buttonNewGameUp(this.btnNewGame, this));
    }

    buttonNewGameUp(button, scene) {
      return function() {
        scene.game.newLevel(scene.startScene, scene);
      };
    }
  };
  return MainMenu;
});

