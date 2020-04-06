const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config({ path: '.env' });

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const config = {
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
};

module.exports = { config };
