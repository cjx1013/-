(function() {
// 类型声明，描述一个对象类型
type myType = {
    name: String
    age: number
}
//类型声明不能重复定义
// type myType = {

// }

let obj: myType = {
    name: 'ccc',
    age: 12
}

// 接口来定义一个类结构,用来定义一个类中应该包含哪些属性和方法
// 同时接口也可以当成类型声明去使用
interface myInterface{
    name: String,
    age: number
}
// 接口可以重复声明
interface myInterface{
    gender: 'female' | 'male'
}

let obj2: myInterface = {
    name: 'ddd',
    age: 22,
    gender: 'female'
}

// 接口可以在定义类的时候去限制类的结构
// 接口中所有的属性都不能有实际的值
// 接口只定义对象的结构，而不考虑实际值
// 在接口中所有的方法都是抽象方法
interface myInter{
    name: string,
    sayHello():void;
}

// 定义类时，可以使类去实现一个接口
// 实现接口就是使类满足接口的要求
class MyClass implements myInter{
    name: string
    
    constructor(name:string){
        this.name = name
    }
    sayHello(): void {
        console.log('hello');
        
    }
}
})()