const path = require("path");



module.exports = env => {
  let publicPath = "/static/js/english/dist/";
  if (env !== undefined) {
    if (env.PUBLIC_PATH != undefined) {
      publicPath = env.PUBLIC_PATH;
    }
  }
  return {
    entry: "./main_webpack.js",
    resolve: {
      modules: [
        path.resolve(__dirname, "."),
        path.resolve(__dirname, "./scenes"),
        path.resolve(__dirname, "./gameobjects"),
        path.resolve(__dirname, "./node_modules/phaser/dist"),
      ]
    },
    output: {
        publicPath: publicPath,
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    }
  };
};