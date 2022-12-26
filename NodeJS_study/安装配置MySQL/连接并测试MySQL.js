//1、导入mysql模块
const mysql = require('mysql')

//2、建立与mysql数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1',      //数据库的IP地址
    user: 'root',           //登录数据库的账号
    password: 'chen1013',   //登录数据库的密码
    database: 'my_db_01'    //指定要操作哪个数据库
})

//3、监测mysql模块能否正常工作
// db.query('SELECT 1', (err, results) => {
//     if(err) return console.log(err.message);
//     //只要打印出[RowDataPacket {'1' : 1}]的结果，就证明数据库连接正常
//     console.log(results);
// })

//4、查询users表中的所有数据
// const sqlStr = 'select * from users'
// db.query(sqlStr, (err, results)=>{
//     if(err) return console.log(err.message);
//     //注意：如果执行的是select查询语句，那么返回的结果是数组
//     console.log(results);
// })

//5、向users表中插入一条数据
// const user = {username: 'ccc', password: '213'}
// const sqlStr = 'insert into users(username, password) values (?, ?)'
// db.query(sqlStr, [user.username, user.password], (err, results)=>{
//     if(err) return console.log(err.message);
//     //注意：如果执行的是insert into插入语句，那么返回的结果是一个对象
//     //可以通过affectRows属性来判断是否插入数据成功
//     if(results.affectRows === 1){
//         console.log('插入数据成功');
//     }
// })

//6、向表中插入数据的快捷方式
//当数据对象的每个属性和数据表的字段一一对应时，则可以快捷插入
// const user = {username: 'ddd', password: '213'}
// const sqlStr = 'insert into users set ?'
// db.query(sqlStr, user, (err, results)=>{
//     if(err) return console.log(err.message);
//     if(results.affectRows === 1){
//         console.log('插入数据成功');
//     }
// })

//7、更新表中的数据
// const user = {id: 2, username: 'eee', password: '123'}
// const sqlStr = 'update users set username = ?, password = ? where id = ?'
// db.query(sqlStr, [user.username, user.password, user.id], (err, results)=>{
//     if(err) return console.log(err.message);
//     if(results.affectRows === 1){
//         console.log('更新成功');
//     }
// })

//8、更新表中的数据的快捷方式
//当数据对象的每个属性和数据表的字段一一对应时，则可以快捷更新
// const user = {id: 2, username: 'eeee', password: '123'}
// const sqlStr = 'update users set ? where id = ?'
// db.query(sqlStr, [user, user.id], (err, results)=>{
//     if(err) return console.log(err.message);
//     if(results.affectRows === 1){
//         console.log('更新成功');
//     }
// })

//9、删除数据
// const sqlStr = 'delete from users where id = ?'
// //注意：如果sql语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
// //当sql语句中只有一个占位符，则可以省略数组
// db.query(sqlStr, 6, (err, results)=>{
//     if(err) return console.log(err.message);
//     if(results.affectRows === 1){
//         console.log('删除成功');
//     }
// })

//10、标记删除
//为了保险起见，删除数据并不会真的删除，而是通过类似于status这样
//的状态字段，标记这条数据被删除，所以标记删除实际上是执行了update
const sqlStr = 'update users set status = ? where id = ?'
db.query(sqlStr, [1, 4], (err, results)=>{
    if(err) return console.log(err.message);
    if(results.affectRows === 1){
        console.log('删除成功');
    }
})