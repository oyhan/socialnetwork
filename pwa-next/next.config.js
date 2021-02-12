const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})
module.exports = {
  async redirects(prams) {
    console.log('prams: ', prams);
    return [
      {
        source: '/post/:slug(\\d{1,})',
        destination: '/news/:slug', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    })
    return config

  }
}

