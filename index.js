const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const app = new Koa();
const router = new Router();


router.get('/', (ctx, next) => { ctx.body = 'Hello, asshole'; })

app
  .use(Logger())
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
