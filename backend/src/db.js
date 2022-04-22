const { Pool } = require("pg");
const config = require("./config");
const pool = new Pool({
    user: config.DB_USER,
    password: config.DB_PW,
    database: "todo_db",
    host: config.DB_HOST,
    port: config.DB_PORT
})

module.exports = pool;