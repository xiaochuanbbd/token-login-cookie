const jwt = require('jsonwebtoken')
const {
  secretKey
} = require('../config/config')

const
  basicAuth = require('basic-auth')
class Auth {
  constructor(level) {
    Auth.USER = 2
    Auth.ADMIN = 8
    this.level = level
  }
  get middleware() {
   /*  
    1.先检查token合法性
    2. 合法过期怎么处理
    3. 不合法在处理
    */
    return async (ctx, next) => {
      const token = basicAuth(ctx.request)
      let errmag = 'token不合法'
      if (!token || token.name == 'null') {
        ctx.body = {
          errCode: 10005,
          msg: errmag,
          request: `${ctx.method} ${ctx.path}`
        }
        return
      }
      try {
        var decode = jwt.verify(token.name, secretKey)


      } catch (e) {
        // 1. token 不合法
        //2. token 合法 但是已经过期 特殊名字：e.name.tokenExpiredError
        if (e.name === 'tokenExpiredError') {
          errmag = 'token过期'
        }
        ctx.body = {
          errCode: 10005,
          msg: errmsg,
          request: `${ctx.method} ${ctx.path}`

        }
        return
      }
      if (decode.scope < this.level) {
        ctx.body = {
          errCode: 10005,
          msg: '权限不足',
          request: `${ctx.method} ${ctx.path}`

        }
        return
      }
      //执行下一行中间件
      await next()


    }
  }
  //验证token
  static verifyToken(token) {
    try {
      jwt.verify(token, secretKey)
      return true
    } catch (e) {
      return false
    }
  }
}
module.exports = Auth