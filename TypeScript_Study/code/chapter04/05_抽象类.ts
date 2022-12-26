(function() {

    // 以abstract开头的类是抽象类
    // 抽象类和其他类区别不大，只是不能用来创建对象
    // 抽象类就是专门用来被继承的类
    abstract class Animal {
        name: string
        age: number
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        // 抽象类里可以写抽象方法
        // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
        // 抽象方法没有函数体
        abstract sayHello(): void
    }

    class Dog extends Animal{
        sayHello() {
            console.log('汪汪汪');
        }
    }

    const dog = new Dog('小黄', 3)
    dog.sayHello()

})()