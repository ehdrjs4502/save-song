// config/database.js
require("dotenv").config("../../.env");

const dbHost = process.env.DB_HOST;
const user = process.env.DB_USER;
const pw = process.env.DB_PASSWORD;
const db = process.env.DB;

module.exports = {
  host: dbHost,
  user: user,
  password: pw,
  database: db,
  multipleStatements: true, // 다중 쿼리 쓸 수 있게 해주는 고마운 거
};
