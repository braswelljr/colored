const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching
        }
      }
    ]
  ],
  {
    wepack: (config, options) => {
      if (!options.dev) {
        options.defaultLoaders.babel.options.cache = false
      }

      config.module.rules.push({
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/.next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      })

      config.resolve.modules.push(path.resolve(`./`))

      return config
    },
    future: {
      webpack5: true
    }
  }
)
