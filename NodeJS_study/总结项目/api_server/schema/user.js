//定义用户信息验证模块

//导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
//用户名为字符串，由字母组成，最小长度为1，最大长度为10，且用户名是必需的
const username = joi.string().alphanum().min(1).max(10).required()
//密码为字符串，以非空白字符开头，以非空白字符结尾，非空白字符长度为6到12，且密码是必需的
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义更新用户信息的验证规则
const id = joi.number().integer().required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义更换头像的验证规则
const avatar = joi.string().dataUri().required()

//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        /*
            username:username,
            password:password
         */
        username,
        password
    }
}

//定义验证更新用户信息数据的规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

//定义验证重置密码的规则对象
exports.update_password_schema = {
    body: {
        //使用之前创建的password这个规则，验证req.body.oldPwd的值
        oldPwd: password,
        //使用joi.not(joi.ref('oldPwd')).concat(password)规则，验证req.body.newPwd的值
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

//定义验证更换头像的规则对象
exports.update_avatar_schema = {
    body: {
        avatar
    }
}