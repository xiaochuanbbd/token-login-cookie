const Router = require('@koa/router')
const Auth= require('../../middlewares/auth')

const contentRouter = new Router({
  prefix:'/content'
})

contentRouter.get('/',async ctx=>{
  ctx.body = '获取文章内容成功'
})

//new auth(这里传入权限的级别 )
contentRouter.post('/',new Auth(1).middleware,async ctx=>{
  ctx.body = '新增文章内容成功'
})

module.exports = contentRouter