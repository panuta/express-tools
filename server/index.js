const express = require('express');
const path = require('path');

const app = express();
const port = process.argv.length >= 3 ? parseInt(process.argv[2], 10) : 3000;

if (process.env.NODE_ENV !== 'production') {
  console.log('Setting up Webpack Middlewares');

  const Webpack = require('webpack');
  const WebpackDevMiddleware = require('webpack-dev-middleware');
  const WebpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

  const compiler = Webpack(webpackConfig(process.env));
  app.use(WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }));
  app.use(WebpackHotMiddleware(compiler));
}

app.get('/health/full', (req, res) => res.send('I am healthy!'));

// Serving static and App files
app.use('/static/', express.static(path.join(__dirname, 'static')));
app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
