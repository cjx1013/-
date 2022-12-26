// 声明a为一个对象类型，但是这种不怎么用，因为声明为一个对象没什么用
// 比如，a={}，a是个对象，a=function(){}，a也是个对象，我们更希望的是
// 通过声明，限制对象有什么样的属性，属性值
let a: Object

// {}用来指定对象的属性和属性值
// 语法：{属性名：属性值，属性名：属性值……}
// b为一个对象，有且只有属性name和age，而且name是字符串，age是数字型
let b: {name: string, age: number}
b = { name: '123', age: 12 }

// age?:number表示age这个属性可有可无
let c: {name: string, age?:number}
c = {name: 'ddd'}
c = {name: 'sfsd', age: 23}

// [xxx: string]表示属性名是string类型，:any表示值可以是任意值
// 整个表示d是一个对象，且d有name属性，值为string类型，可能有其他属性，
// 其他属性的属性名是string类型，值可以是任意值
let d: {name: string, [xxx: string]: any}
d = {name: 'sdfsdf'}
d = {name: 'sfs', age: 23, gender: '男'}

// 设置函数结构的类型声明
// 语法：(形参：类型，形参：类型……) => 返回值
// 函数e的形参为两个number型，返回值也是number型
// 
let e: (a: number, b: number) => number
e = function(n1, n2) {
    return n1 + n2
}

// e = function(n1, n2) { // 报错
//     return '3' + n2
// }

// 声明数组两种方式
// 一、类型[]，二、Array<类型>
// 表示f是一个元素都为number类型的数组
let f: number[]
f = [1, 2]
//f = ['11', 3] // 报错

let g: Array<number>
g = [12, 34]
//g = [true, 1] // 报错

// 元组：固定长度的数组
// 语法：[类型，类型……]
// 表示h这个数组中只能有两个元素，类型为string和number型
let h: [string, number]
h = ['cc', 1]
// h = [2, 34] //报错 

// 枚举
enum Gender{
    male = 0,
    female = 1
}
let i: {name: string, gender: Gender}
i = {
    name: 'cjx',
    gender: Gender.male
}
console.log(Gender.male); // 结果为0
console.log(i.gender === Gender.female); // 结果为false

// &符号，表示且
// 表示j是个既有类型为string的name属性，也有个类型为number的age属性
let j: {name: string} & {age: number}
j = { name: 'cc', age: 12 }
//j = { name: 'cc' } // 报错
//j = { name: 'cc', age: 12, dd: 2 } // 报错


// 类型的别名
// let k : 1 | 2 | 3 | 4 | 5
// let l : 1 | 2 | 3 | 4 | 5
type myType =  1 | 2 | 3 | 4 | 5
let k: myType
let l: myType