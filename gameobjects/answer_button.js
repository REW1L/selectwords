define(['Phaser', 'gameobjects/round_button'], function(Phaser, RoundButton) {

  const Statuses = Object.freeze({'NOT_ACTIVATED': 0, 'ACTIVATED_RIGHT': 1,
                                  'ACTIVATED_WRONG': 2, 'ACTIVATED_PREP': 3});

  var AnswerButton = class extends RoundButton {

    constructor (scene, x, y, text='') {
      // first text
      super(scene, x, y, 150, 110, text);
      this.score = 0;
      this.status = Statuses.NOT_ACTIVATED;
      this.addListener('pointerup', this.onUp);
      this.setColor(0x777777);
    }

    setData(text) {
      this.text.text = text;
      this.status = Statuses.NOT_ACTIVATED;
      this.setColor(0x777777);
      this.update();
    }

    onUp(word) {
      this.pointerStatus = 'pointerup';
      let scoreResult = 0;
      console.log(`${this.name}.onUp`);
      if(word == this.text.text) {
        if (this.status != Statuses.ACTIVATED_RIGHT) {
          this.status = Statuses.ACTIVATED_RIGHT;
          this.setColor(0x008C0A);
          scoreResult = 1;
        }
      } else {
        if (this.status != Statuses.ACTIVATED_RIGHT) {
          this.status = Statuses.ACTIVATED_WRONG;
          this.setColor(0xC24434);
          scoreResult = -1;
        } else {
          this.setColor(0x008C0A);
        }
      }
      return scoreResult;
    }

  };
  return AnswerButton;
});

