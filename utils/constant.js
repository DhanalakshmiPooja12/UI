module.exports = {
  PORT: 4000,
  HTML_STATUS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    INVALID_DATA: 406,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },

  TOKEN_TIMEOUT: "1095d", // 1 hour
  APP_SECRETE: "wimera@admin123#@!",
  database: {
    PORT: 4000,
    host: "localhost",
    port: 27017,
    db: "kaviadb",
    username: "dbAdmin",
    password: "dbAdmin",
  },
  databaseKavia: {
    host: "localhost",
    port: 27017,
    db: "KAVIASFSDB",
    username: "dbAdmin",
    password: "dbAdmin",
  },

  UPLOAD_PATH: "../UI/src/assets/",
};
