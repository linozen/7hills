const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  i18n,
  env: {
    STRAPI_API_URL: 'https://api.linus.cx'
  },
  images: {
    domains: ["localhost", "https://api.linus.cx"]
  },
  pwa: {
    disable: prod ? false : true,
    dest: "public",
    swSrc: "service-worker.js",
  },
});
