const { i18n } = require("./next-i18next.config");
const prod = process.env.NODE_ENV === "production";

module.exports = {
  future: { webpack5: true },
  i18n,
  images: {
    domains: [
      "localhost",
      "api.sevenhills-restaurant.de",
      "sevenhills-restaurant.de",
    ],
  },
};
