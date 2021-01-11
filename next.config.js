module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          child_process: 'empty',
          fs: 'empty',
          crypto: 'empty',
          net: 'empty',
          tls: 'empty'
        }
      }
      
      return config
    }
  }