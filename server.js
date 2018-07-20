const express = require('express');
const path = require('path');
const app = express();


if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
  // app.use(require("webpack-hot-middleware")(compiler));

  app.use('*', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));