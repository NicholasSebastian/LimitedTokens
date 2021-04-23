const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com']
  }
}