module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("WEBSITE"), // THIS ONE
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
