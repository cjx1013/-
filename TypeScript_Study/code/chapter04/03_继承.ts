// 因为ts不允许多个ts文件里有命名重复，所以这里使用立即执行函数
(function() {
    class Animal{
        name: string;
        age: number;
    
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }
    
        sayHello(){
           console.log('heiheihei');
           
        }
    }
    // extends继承，此时Animal成为父类，Dog称为子类
    // 使用继承后，子类会拥有父类所有的方法和属性
    // 通过继承可以将多个类中共有的代码写在一个父类中
    // 这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法
    // 如果希望在子类中添加一些父类中没有的属性或方法直接加上去就可以了
    // 如果在子类中添加和父类相同的方法，则子类方法会覆盖掉父类的方法
    // 这种称为重写
    class Dog extends Animal{
        run(){
            console.log(`修勾${this.name}，跑！`);
            
        }
        sayHello(){
            console.log('汪汪汪~');
            
        }
    }

    class Cat extends Animal{
        
    }

    const dog = new Dog('小黑', 11)
    const cat = new Cat('咪咪', 11)
    dog.run()
    dog.sayHello()
    cat.sayHello()
})()

