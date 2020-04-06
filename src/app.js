const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const { Pool } = require('pg');
const { config } = require('./config');

const app = new Koa();
const router = new Router();

pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});

router.get('', async ctx => {
    const { rows } = await pool.query('SELECT * FROM trades');
    ctx.body = rows;
});

console.log('Loading environmental variables...');

app.use(bodyParser());
app.use(router.routes());

app.listen(8000);
