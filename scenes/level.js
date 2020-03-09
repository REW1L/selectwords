define(['Phaser', 'gameobjects/answer_button', 'gameobjects/round_button'],
       function(Phaser, AnswerButton, RoundButton) {

  var Level = class extends Phaser.Scene {
    constructor (key, text='How did you go so far?', score=0) {
      // first text
      super({'key': key});
      this.levelNumber = 0;
      this.sentences = text.split(new RegExp('[?,\\.!]'));
      console.log(this.sentences.length);
      this.text = 'Select words in right order';
      this.score = score;
      this.currentSeconds = Math.floor(Date.now()/1000);
      this.words = [];
    }

    refresh(text='', score=0, timer=8000) {
      this.text = text.trim();
      this.score = score;
      this.currentNumber = 0;
      this.maxNumber = 1;
      this.timer = timer + 7000 - this.levelNumber*200;
      if (this.levelNumber < 10) {
        this.levelNumber++;
      }
      this.drawLevel();
    }

    preload () {
      // load all before creating anything
      // this: scene
    }
  
    create () {
      // called after loading
      // this: scene
      this.levelNumber = 0;
      this.score = 0;
      this.currentNumber = 0;
      this.timer = 15000;
      console.log(this.scale);
      this.graphics = this.add.graphics();

      this.timerText = this.add.text(50, 68);
      this.timerText.setFontSize(64);

      this.scoreText = this.add.text(250, 68);
      this.scoreText.setFontSize(64);

      this.currentText = this.add.text(10, 760);
      this.currentText.setFontSize(24);

      this.menuButton = new RoundButton(this, 370, -20, 150, 60);
      this.menuButton.graphics.setVisible(false);
      this.menuButton.text.setFontSize(20);
      this.menuButton.text.y += 15;
      this.menuButton.text.text = 'Main menu';
      this.menuButton.addListener('pointerup', this.pushMenuButton(this));

      this.input.enabled = true;
      this.answerButtons = [];
      for (let i = 0; i < 15; i++) {
        let btn = new AnswerButton(this, (i%3)*160+15,
                                   (Math.floor(i/3))*120+160);
        btn.name = `AnswerButton_${i}`;
        btn.addListener('pointerup', this.pushAnswerButton(btn, this));
        this.answerButtons.push(btn);
      }
      document.body.style.backgroundColor = "#0BC3E6";
      this.cameras.main.setBackgroundColor('#0BC3E6');
      this.drawLevel();
    }

    drawLevel() {
      console.log(this.cameras.main);
      this.words = this.text.replace(new RegExp('[?,\\.!]'), '').split(' ');
      let shuffledWords = [...this.words].sort(() => Math.random() - 0.5);
      console.log(shuffledWords);
      this.maxNumber = shuffledWords.length;
      for(let i = 0; i < this.answerButtons.length; i++) {
        this.answerButtons[i].setData(shuffledWords[i % shuffledWords.length]);
      }
      this.drawTimer();
      this.drawScore();
      this.drawPlaceHolder();
    }

    drawTimer() {
      let time = Math.floor((this.timer)/1000);
      if (time < 0) {
        time = 0;
        this.graphics.fillStyle(0x000000, 1);
      } else if (time < 5) {
        this.graphics.fillStyle(0xC40016, 1);
      } else if (time < 10) {
        this.graphics.fillStyle(0xD4B00D, 1);
      } else {
        this.graphics.fillStyle(0x0CE891, 1);
      }
      if (time < 50) {
        this.timerText.text = `${time}`;
      } else {
        this.timerText.text = `50+`;
      }
      this.graphics.fillRoundedRect(50, 50, 120, 100, 16);
      this.timerText.x = 50 + (120 - this.timerText.width)/2;
    }

    drawScore() {
      this.graphics.fillStyle(0x0CE891, 1);
      this.graphics.fillRoundedRect(250, 50, 200, 100, 16);
      this.scoreText.text = this.score;
      this.scoreText.x = 250 + (200 - this.scoreText.width)/2;
    }

    drawPlaceHolder() {
      this.graphics.fillStyle(0x099CB8, 1);
      this.graphics.fillRoundedRect(0, 760, 500, 100, 16);
      this.currentText.setWordWrapWidth(480);
      this.currentText.text = this.text;
      this.currentText.y = 810 - (this.currentText.height/2);
      this.currentText.x = 250 - (this.currentText.width/2);
    }

    pushAnswerButton(button, scene) {
      return function() {
        let score = button.onUp(scene.words[scene.currentNumber]);
        if(score > 0) {
          scene.currentNumber++;
        }
        scene.score += score;
        console.log(scene.score);
      };
    }

    pushMenuButton(scene) {
      return function() {
        scene.game.mainMenu(scene);
      };
    }

    gameOver() {
      this.game.gameOver(this.score, this);
    }

    update (time, delta) {
      // game ticker
      // this: scene
      let currentSeconds = Math.floor(Date.now()/1000);
      if (currentSeconds > this.currentSeconds) {
        this.timer -= 1001;
        this.currentSeconds = currentSeconds;
        this.drawTimer();
      }
      if (this.timer < 1 || this.score < -5) {
        this.gameOver(score);
      }
      if (this.currentNumber >= this.maxNumber) {
        let text;
        do {
          let sNumber = Math.floor(Math.random()*(this.sentences.length));
          text = this.sentences[sNumber];
        } while (text.trim().split(' ').length > 12);
        this.refresh(text, this.score, this.timer);
      }
    }

  };
  return Level;
});
