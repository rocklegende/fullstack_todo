const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    DB_HOST : process.env.POSTGRES_HOST,
    DB_PORT : process.env.POSTGRES_PORT,
    DB_USER : process.env.POSTGRES_USER,
    DB_PW: process.env.POSTGRES_PASSWORD,
    EXPRESS_PORT: process.env.EXPRESS_PORT,
}