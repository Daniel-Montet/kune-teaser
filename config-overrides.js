module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
  };
  return config;
};
