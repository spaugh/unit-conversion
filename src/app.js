const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const { convertToSI } = require('./expressions');

const app = new Koa();
const router = new Router();

async function responseTime(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

router.get('/units/si', (ctx, next) => { 
  let { expression, conversionFactor } = convertToSI(ctx.query.units);
  ctx.body = JSON.stringify({
    expression: expression,
    multiplication_factor: conversionFactor.toPrecision(14),
  });
  ctx.set('Content-Type', 'application/json');
})

app
  .use(Logger())
  .use(responseTime)
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
