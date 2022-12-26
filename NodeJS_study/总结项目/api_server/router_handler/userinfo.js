//导入数据库操作模块
const db = require('../db/index')
//导入密码加密模块
const bcrypt = require('bcryptjs')

//获取用户信息
exports.getUserinfo = (req, res)=>{
    //定义sql语句查询用户的除密码之外的信息
    const sqlStr = 'select id, username, email, nickname, user_pic from ev_users where id = ?'
    //只要token解析成功，那么express-jwt中间件就会将数据帮我们挂载req.user属性上
    db.query(sqlStr, req.user.id, (err, results)=>{
        if(err) return res.cc(err)
        //查询到了，但是查询到的记录不止一条
        if(results.length !== 1) return res.cc('获取用户信息失败')
        //将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户信息成功!',
            data: results[0]
        })
    })
}

//更新用户信息
exports.updatetUserinfo = (req, res)=>{
    //定义更新用户信息的sql语句
    const sqlStr = 'update ev_users set ? where id = ?'
    db.query(sqlStr, [req.body, req.body.id], (err, results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户信息失败!')
        res.cc('更新用户信息成功!', 0)
    })
}

//重置密码
exports.updatePassword = (req, res)=>{
    //根据id查询用户信息
    const sqlStr = 'select * from ev_users where id = ?'
    db.query(sqlStr, req.user.id, (err, results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在!')
        //判断旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('旧密码错误!')

        //定义更新密码的sql语句
        const sql = 'update ev_users set password = ? where id = ?'
        //对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('重置密码出错!')
            res.cc('重置密码成功!', 0)
            
        })
    })
}

//更换头像
exports.updateAvatar = (req, res)=>{
    //定义更换头像的sql语句
    const sql = 'update ev_users set user_pic = ? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更换头像失败!')
        res.cc('更换头像成功!', 0)
    })
}