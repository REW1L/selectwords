define(['Phaser', 'gameobjects/round_button'], function(Phaser, RoundButton) {

  var GameOver = class extends Phaser.Scene {
    constructor (key) {
      // first text
      super({'key': key});
      this.level = null;
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

      this.graphics = this.add.graphics();

      this.scoreText = this.add.text(50, 110);
      this.scoreText.setFontSize(72);
      this.scoreText.align = 'center';
      this.scoreText.text = `Score: ${this.score}`;

      this.input.enabled = true;

      this.btnRestart = new RoundButton(this, 10, 500, 220, 100, 'Restart',
                                        0x008C0A);
      this.btnRestart.addListener('pointerup',
                                  this.buttonRestartUp(this.btnRestart, this));
      this.btnMainMenu = new RoundButton(this, 270, 500, 220, 100, 'Main menu',
                                         0x008C0A);
      this.btnMainMenu.addListener('pointerup',
                                   this.buttonMainMenuUp(this.btnMainMenu,
                                                         this));
      this.drawScore();
    }

    drawScore() {
      if (this.level != null) {
        this.score = this.level.score;
      }
      this.graphics.fillStyle(0x0CE891, 1);
      this.graphics.fillRoundedRect(10, 48, 480, 200, 16);
      this.scoreText.text = `Score: ${this.score}`;
      this.scoreText.x = 250 - this.scoreText.width/2;
    }

    buttonRestartUp(button, scene) {
      return function() {
        scene.game.newLevel(scene.level, scene);
      };
    }

    buttonMainMenuUp(button, scene) {
      return function() {
        scene.game.mainMenu(scene.level);
      };
    }
  };
  return GameOver;
});

