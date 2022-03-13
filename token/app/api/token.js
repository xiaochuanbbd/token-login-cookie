const Router = require('@koa/router')
const users = require('../../data/users')
const {
  generateToken
} = require("../../core/util.js")

const Auth = require('../../middlewares/auth')
const tokenrRouter = new Router({
  prefix: '/token'
})

tokenrRouter.post('/', async ctx => {
  const {
    username,
    password
  } = ctx.request.body //这里可以拿到前端回传的信息
  let token = verifyUsernamePassword(username, parseInt(password))
  //如果token为undefined，返回错误的提示
  if (!token) {
    ctx.body = {
      errCode: 10001,
      msg: '用户名或者密码不正确',
      request: `${ctx.method} ${ctx.path}`
    }
    return
  }
  ctx.body = {
    token
  }
})
//检测token的有效性
tokenrRouter.post('/verify', async ctx => {
  const token = ctx.request.body.token
  const isVaild = Auth.verifyToken(token)
  ctx.body={
    isVaild,

  }
})
//判断用户名和密码是否正确
function verifyUsernamePassword(username, password) {
  const index = users.findIndex(user => {
    return user.username === username && user.password === password
  })
  const user = users[index]

  if (!user) {
    return undefined
  }
  const token = generateToken(user.id, Auth.USER)
  return token

}

module.exports = tokenrRouter