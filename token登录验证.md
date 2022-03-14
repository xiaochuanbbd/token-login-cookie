### token登录验证

步骤：

1. 前台用户在登录的过程中，将用户名和密码发送给后端；

2. 后端拿到用户名和密码，验证密码和用户名是否正确，正确的话会根据用户id，用户名，定义好的秘钥，过期时间生成唯一的用户标识（token），并将token返回给前端
3. 前端将token存储在cookie中
4. 前端在每一次请求API里通过cookie携带用户的唯一标识token去获取数据，
5. 请求的发送设置在请求拦截器，在请求拦截器里让给请求头的cookie携带自定义token ，发送给后端；
6. 后端验证token是否正确，正确返回信息，错误返回错误验证码
7. 退出登录的时候清除token， cookies.remove
8. token如果已经过期。需要重新登录，替换原来的token
9. cookie的方法：cookies.set cookies.get  cookies.remove

![8cc38da865f9fa738eb03b7dc4ed63cb.png](https://img-blog.csdnimg.cn/img_convert/8cc38da865f9fa738eb03b7dc4ed63cb.png)

后端：
 1.使用koa搭建服务器，用到的功能函数：
    use()  将给定的中间件方法添加到此应用程序，app.use() 返回this。因此可以链式调用
    app.listen() 监听端口号 
    上下文context 简写：ctx  每个请求都将创建一个context，并在中间件作为接收器引用 ，ctx.request ctx.response 
    koa-router koa路由中间件 
        const tokenrRouter = new Router({
        prefix: '/token'
        })
    router.prefix(prefix) 来设置路由的前缀
    路由中间件： 
    //new auth(这里传入权限的级别 )--中间件
    contentRouter.post('/',new Auth(1).middleware,async ctx=>{
    ctx.body = '新增文章内容成功'
    })
    ctx.body = {xxx} 请求返回的响应data

 2.jwt jsonwebtoken令牌，用于做身份认证的用户信息，改token可以直接被用与认证，也可以被加密。项目中用于生成token。
   jwt可以跨语言， 字节占用量小，非常便于传输
   jwt密钥和过期时间
        module.exports = {
        secretKey: 'jK123uu_s$!', // 加密密钥 
        expiresIn:24*60*60 //过期时间
        }
     
 3.验证token是否过期中间件 ./middlewares/auth.js
   新建 Auth类
        get moddleware 步骤：
        1.检查token合法性
        2.token不合法
        3.token合法但是已过期  jwt.verify()验证token是否过期， 特殊名字：e.name.tokenExpiredError 该名字表示已过期
        4.判断是否有权限，权限绑定在Auth类函数构造器中。 
        5.执行下一行中间件
   验证token
        //验证token
        static verifyToken(token) {
            try {
            jwt.verify(token, secretKey)
            return true
            } catch (e) {
            return false
            }
        }
 


    