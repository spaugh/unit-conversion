const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const { convertToSI, errors } = require('./expressions');

const app = new Koa();
const router = new Router();

async function errorHandling(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err instanceof errors.ExtendableError) {
      ctx.status = err.internal ? 500 : 400;
      ctx.body = err.internal ? err.message : 'Internal Server Error';
    } else {
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
    ctx.app.emit('error', err, ctx);
  }
}

async function convert(ctx) {
  let { expression, conversionFactor } = convertToSI(ctx.query.units);
  ctx.body = JSON.stringify({
    unit_name: expression,
    multiplication_factor: parseFloat(conversionFactor.toPrecision(14)),
  });
  ctx.set('Content-Type', 'application/json');
}

router.get('/units/si', convert);

app.use(Logger());
app.use(errorHandling);
app.use(router.routes());
app.use(router.allowedMethods());

let server = app.listen(process.env.PORT || 3000);

module.exports = server;
