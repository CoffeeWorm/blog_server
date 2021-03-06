const Koa = require('koa');
const session = require('koa-session2');
const router = require('./router/router');
const jump2Tips = require('./middleware/not-recommended');
const cors = require('koa2-cors');
require('./mongodb/db');
const config = require('./config/common');


let app = new Koa();

app.keys = ['asudhfushabdlfkjhasdkjfblaksjdbflkjabsdfuigeiu1!@#$#%#%#$'];

app.use(jump2Tips);

app.use(cors({
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Accept'],
}));
app.use(session({ key: 'SESSIONID', maxAge: 20 * 60 * 1000, httpOnly: true, signed: true }, app));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`Server is running at ${config.port} port!`);
});
