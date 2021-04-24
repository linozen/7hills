const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  future: { webpack5: true },
  i18n,
  images: {
    domains: ["localhost", "api.sevenhills-restaurant.de", "sevenhills-restaurant.de"]
  },
  pwa: {
    disable: prod ? false : true,
    dest: "public",
    fallbacks: {
      image: '/trees.png',
      document: '/fallback'
    }
  },
});
