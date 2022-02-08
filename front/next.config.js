const { i18n } = require("./next-i18next.config");
const prod = process.env.NODE_ENV === "production";

module.exports = {
  future: { webpack5: true },
  i18n,
  images: {
    domains: [
      "localhost", // developement
      "api.sevenhills-restaurant.de", // CMS (production)
      "sevenhills-restaurant.de", // ./public
    ],
  },
};
