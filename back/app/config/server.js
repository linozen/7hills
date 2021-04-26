module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('WEBSITE', 'http://127.0.0.1'), // THIS ONE
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6c19e3be235d98d9c96b411e4bd63157'),
    },
  },
});
