# token-login-cookie
token认证登录信息，权限设置
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
