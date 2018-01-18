const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const { convertToSI, errors } = require('./expressions');

const MAX_FLOAT_PRECISION = 15;
const DEFAULT_PRECISION = MAX_FLOAT_PRECISION;

const formatNumber = (number) => {
  let precision = parseInt(process.env.PRECISION, 10);
  precision = isNaN(precision) ? DEFAULT_PRECISION : precision;
  if (precision > MAX_FLOAT_PRECISION) {
    return number.toPrecision(precision);
  } else {
    return parseFloat(number.toPrecision(precision));
  }
};

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
  if (ctx.query.units) {
    const { expression, conversionFactor } = convertToSI(ctx.query.units);
    ctx.body = JSON.stringify({
      unit_name: expression,
      multiplication_factor: formatNumber(conversionFactor),
    });
  } else {
    ctx.status = 400;
    ctx.body = JSON.stringify({ error: 'Must provide units query string!' });
  }
}


const app = new Koa();
const router = new Router();

router.get('/units/si', convert);

if (process.env.NODE_ENV !== 'test') {
  app.use(Logger());
}
app.use(setHeaders);
app.use(handleErrors);
app.use(router.routes());
app.use(router.allowedMethods());


const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port', server.address().port); // eslint-disable-line no-console
});

module.exports = { app, server };
