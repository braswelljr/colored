const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  distDir: "build",
  pwa: {
    dest: "public",
    runtimeCaching
  },
  future: {
    webpack5: true
  }
});
