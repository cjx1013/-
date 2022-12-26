"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('heiheihei');
        }
    }
    class Dog extends Animal {
        // 如果在子类中写了构造函数，则必须在子类构造函数中对父类构造函数通过super关键字调用
        constructor(name, age) {
            super(name);
            this.age = age;
        }
        sayHello() {
            console.log(`${this.name}今年${this.age}岁了`);
        }
    }
    const dog = new Dog('小黄', 3);
    dog.sayHello();
})();
