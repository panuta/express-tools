module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-react', '@babel/preset-env'];

  const plugins = [];
  if (process.env.NODE_ENV !== 'production') {
    plugins.unshift('react-hot-loader/babel');
  }

  return {
    presets,
    plugins
  };
};
