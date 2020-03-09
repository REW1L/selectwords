require.config({
  paths: {
      Phaser: './node_modules/phaser/dist/phaser'
    },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

require(['game', 'Phaser'], function (Game, Phaser) {

var game = new Game();

});
