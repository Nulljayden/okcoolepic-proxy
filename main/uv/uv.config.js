const config = {
  baseUrl: '/service/',
  bare: '/bare/',
  encodeUrl: (data) => Ultraviolet.codec.xor.encode(data),
  decodeUrl: (data) => Ultraviolet.codec.xor.decode(data),
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  index: '/uv/uv.index.js',
  sw: '/uv/uv.sw.js',
};

Object.freeze(config);

module.exports = config;
