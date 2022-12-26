// 也可以直接使用字面量进行类型声明

let a: 10 // 表示a只能是10
a = 10
// a = 11 //此时会报错

let b: "hello" | "hi" // 表示b只能是hello或hi
b = "hello"
b = "hi"
//b = 123 //此时会报错

let c: boolean | string | number // 表示c可以是boolean、string、number类型
c = false
c = "1344"
c = 123

// let d: any //表示d可以是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检查
// 使用TS时，不建议使用any类型
let d // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的any）
d = "sfs"
d = true
d = 13

// unknown 表示未知类型的值
let e: unknown
e = "sfs"
e = true
e = 13

let s:string

s = d // d的类型为any，它可以赋值给任意变量，（any不仅祸祸自己，还祸祸别人，给别人的类型检查也关闭了）

// unknown类型实际上是一个类型安全的any
// unknown类型的变量不能直接赋值给其他变量
e = "hello"
// s = e // 此处会报错，e的类型看的不是"hello"这个值，不是字符串，它的类型仍然是unknown
// 对于报错，可以这样写
if (typeof e === "string") {
    s = e
}

// 类型断言，可以告诉解析器变量的实际类型
/*
语法：1、变量 as 类型 2、<类型>变量
 */
// 第一种写法
s = e as string // 告诉编译器，e是字符串类型，就又可以将e赋值给s了
// 第二种写法
s = <string>e

function fn1() { // 没写返回值，返回值类型为void

}

function fn2(n) { // 写了返回值，TS可以根据返回值自动判断返回值,这里返回值是true | 1233
    if(n > 0) {
        return true
    }else {
        return 1233
    }
}

function fn3():void{ // :void表示函数没有返回值
    return undefined
    // return null
}

function fn4():never{ // :never表示永远没有返回结果
    throw '报错'
}