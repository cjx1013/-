/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require('../db/index')

//导入生成token字符串的包
const jwt = require('jsonwebtoken')

//导入加密token和还原token的一些配置
const config = require('../schema/config')

//导入bcryptjs对用户密码进行加密
const bcrypt = require('bcryptjs')

//注册用户的处理函数
exports.regUser = (req, res)=>{
    //获取客户端提交到服务器的用户信息
    const userInfo = req.body
    //对表单中的数据进行合法性校验
    if(!userInfo.username || !userInfo.password){
        // return res.send({status: 1, message: '用户名或密码不合法！'})
        return res.cc('用户名或密码不合法！')
    }

    //定义查询用户名是否被占用语句
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userInfo.username, (err, results)=>{
        if(err) {
            // return res.send({status: 1, message: err.message})
            return res.cc(err)
        }

        //用户名被占用
        if(results.length > 0){
            // return res.send({status: 1, message: '用户名已被占用，请更换其他用户名！'})
            return res.cc('用户名已被占用，请更换其他用户名！')
        }
    })

    //对用户密码进行加密，返回值是加密后的密码字符串
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    //定义插入新用户的sql语句
    const sql = 'insert into ev_users set ?'
    db.query(sql, {username: userInfo.username, password: userInfo.password}, (err, results)=>{
        // if(err) return res.send({status: 1, message: err.message})
        if(err) return res.cc(err)
        // if(results.affectedRows !== 1) return res.send({status: 1, message: '注册失败！'})
        if(results.affectedRows !== 1) return res.cc('注册失败')
        //注册成功
        // res.send({status: 0, message: '注册成功'})
        res.cc('注册成功', 0)
    })
}

//登录的处理函数
exports.login = (req, res)=>{
    //获取用户提交的信息
    const userInfo = req.body
    //定义根据用户名查询的语句
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userInfo.username, (err, results)=>{
        if(err) return res.cc(err)
        //如果查询到的结果个数不等于1
        if(results.length !== 1) return res.cc('登录失败!')
        //判断用户输入的密码是否正确，由于密码是经过加密存储到数据库的，所以需要通过
        //bcrypt.compareSync判断用户输入的密码加密后是否与数据库中加密的密码相等
        //之前说过执行select语句的返回的results是数组，数组中每个元素是对象
        //对象的属性是数据库中记录的每个字段
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        
        //对比失败
        if(!compareResult) return res.cc('密码错误！')
        //生成token字符串
        //剔除密码和头像这样的隐私信息
        const user = {...results[0], password: '', user_pic: ''}
        //生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expireIn})
        //将生成的token字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}