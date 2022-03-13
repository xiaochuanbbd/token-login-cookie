const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const tokenrRouter = require('./app/api/token')
const contentRouter = require('./app/api/content')

const app = new Koa()
 app.use(bodyParser())

 app.use(tokenrRouter.routes())

 app.use(contentRouter.routes())

 app.listen(5000)