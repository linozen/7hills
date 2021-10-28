module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: env("DATABASE_FILENAME", "../db.sqlite"),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
