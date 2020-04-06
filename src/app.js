const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
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

router.post('/trades/', async ctx => {
    const {
        buyPrice,
        buyDate,
        sellPrice,
        sellDate,
        sellPeriod,
    } = ctx.request.body;
    const newTrade = await pool.query(
        `INSERT INTO trades (buy_price, buy_date, sell_price, sell_date, sell_period) 
        VALUES (${buyPrice}, '${buyDate}', ${sellPrice}, '${sellDate}', '${sellPeriod}') RETURNING *`,
    );
    ctx.body = newTrade.rows;
});

console.log('Loading environmental variables...');

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(8000);
