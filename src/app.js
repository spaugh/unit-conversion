const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const { convertToSI, errors } = require('./expressions');

const app = new Koa();
const router = new Router();

async function setHeaders(ctx, next) {
  await next();
  ctx.set('Content-Type', 'application/json');
}

async function handleErrors(ctx, next) {
  try {
    await next();
  } catch (err) {
    const userError = (err instanceof errors.ExtendableError);
    ctx.status = userError ? 400 : 500;
    ctx.body = JSON.stringify({ error: userError ? err.message : 'Internal Server Error' });
    if (!userError) {
      ctx.app.emit('error', err, ctx);
    }
  }
}

async function convert(ctx) {
  ctx.assert(ctx.query.units, 400, JSON.stringify({ error: 'Must provide unit query string!' }));
  let { expression, conversionFactor } = convertToSI(ctx.query.units);
  ctx.body = JSON.stringify({
    unit_name: expression,
    multiplication_factor: parseFloat(conversionFactor.toPrecision(14)),
  });
}

router.get('/units/si', convert);

app.use(Logger());
app.use(setHeaders);
app.use(handleErrors);
app.use(router.routes());
app.use(router.allowedMethods());

let server = app.listen(process.env.PORT || 3000);

module.exports = { app, server };
