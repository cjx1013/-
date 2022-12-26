(function() {
    // 当函数或类中数据类型不确定的时候就可以使用泛型

    // T可以是任意类型
    function fn1<T>(name: T):T {
        return name
    }
    fn1('fff') // 不指定泛型，ts就会自动判断泛型的类型
    fn1<number>(1111)// 指定泛型

    // 指定多个泛型
    function fn2<T, K> (name: T, age: K):T{
        console.log(age);
        return name
    }

    fn2('ccc', 12)
    fn2<string, number>('ddd', 22)

    // 对泛型进项限制
    interface myInter{
        length: number
    }

    // 表示泛型T必须满足接口myInter，即具有string类型的name属性
    function fn3<T extends myInter>(a: T):number {
        return a.length
    }
    fn3({length: 66})

    class A<T> {
        name: T
        constructor(name: T){
            this.name = name
        }
    }
    const a = new A<string>('sss')
})()