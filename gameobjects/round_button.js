define(['Phaser'], function(Phaser) {

  var RoundButton = class extends Phaser.GameObjects.Container {

    constructor (scene, x, y, width=140, height=140, text='', color=0x777777) {
      super(scene, x, y);
      this.setSize(width, height);
      let fontStyle = {
        fontFamily: 'Calibri',
        fontSize: '24px',
        align: 'center',
        boundsAlignV: 'middle',
        strokeThickness: 4,
        stroke: '#333333',
        padding: {
          top: height/2-20,
        },
        fixedWidth: width,
        fixedHeight: height,
      };
      this.text = new Phaser.GameObjects.Text(this.scene, 0, 0,
                                              text.toUpperCase(), fontStyle);
      this.pointerStatus = 'pointerout';
      this.graphics = new Phaser.GameObjects.Graphics(this.scene);
      this.add(this.graphics);
      this.setInteractive(new Phaser.Geom.Rectangle(width/2, height/2, width,
                          height), Phaser.Geom.Rectangle.Contains);
      this.on('pointerdown', this.onDown);
      this.on('pointerup', this.onUp);
      this.on('pointerout', this.onOut);
      this.setColor(color);
      this.add(this.text);
      scene.add.existing(this);
    }

    setColor(color) {
      this.color = color;
      this.update();
    }

    modifyColorBrightness(color, multiplier) {
      let red = (color >> 16) * multiplier;
      let green = ((color >> 8) & 0xff) * multiplier;
      let blue = ((color) & 0xff) * multiplier;
      red = (red > 0xff) ? 255 : red;
      green = (green > 0xff) ? 255 : green;
      blue = (blue > 0xff) ? 255 : blue;
      return (red << 16) + (green << 8) + (blue);
    }

    onUp() {
      this.update();
    }

    onDown(pointer) {
      let color = this.modifyColorBrightness(this.color, 0.5);
      console.log(pointer.x, pointer.y, this.text.text);
      this.update(color);
    }

    onOut() {
      this.update();
    }

    update (color=this.color) {
      let colorBorder = this.modifyColorBrightness(color, 0.5);
      this.graphics.fillStyle(colorBorder, 1);
      this.graphics.fillRoundedRect(0, 0, this.width, this.height, 16);
      this.graphics.fillStyle(color, 1);
      this.graphics.fillRoundedRect(2, 2, this.width - 4, this.height - 4, 16);
    }
  };
  return RoundButton;
});

