// const withImages = require('next-images')
// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     runtimeCaching,
//   },
//   i18n
// })
module.exports ={
  i18n
}
// module.exports = withImages({
//   webpack(config, options) {
//     return config
//   }
// })
// module.exports = {
//   async redirects(prams) {
    
//     return [
//       {
//         source: '/post/:slug(\\d{1,})',
//         destination: '/news/:slug', // Matched parameters can be used in the destination
//         permanent: false,
//       },
//     ]
//   },
// }
// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty'
//       }
//     }

//     return config
//   }
// }
// // module.exports = {
// //   webpack: (config, options) => {
// //     config.module.rules.push({
// //       test: /\.(png|jpe?g|gif)$/i,
// //       use: [
// //         {
// //           loader: 'file-loader',
// //         },
// //       ],
// //     })
// //     return config

// //   }
// // }
// module.exports = {
//   i18n,
// }

