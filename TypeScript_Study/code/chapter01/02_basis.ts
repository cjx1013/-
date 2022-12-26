// 1、类型声明

let a:number // 声明a变量为number类型

a = 12
// a = '123' // 此行代码会报错，因为a已经声明为number类型，不能赋值为其他类型

// 2、同时声明和赋值变量，那么TS会自动判断变量的类型
let b = false // 就可以不用这么写，let b:boolean = false

//b = 123 // 此行代码会报错，因为同时声明和赋值变量，那么TS会自动判断变量的类型，
// b已经声明为boolean类型，不能赋值为其他类型

// 3、函数形参和返回值类型声明
// a:number, b:number是给形参进行类型声明，
// function sum (a:number, b:number) :number中最后的:number是给返回值进行类型声明
function sum (a:number, b:number) :number{
    return a + b
}