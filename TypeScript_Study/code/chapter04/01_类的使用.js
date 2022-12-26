"use strict";
class Person {
    constructor() {
        this.name = 'ccc';
        // readonly，只读
        this.height = 180;
    }
    eat() {
        console.log('eat');
    }
    static say() {
        console.log('say');
    }
}
Person.age = 11;
Person.weight = 150;
const p = new Person();
console.log(p.name, Person.age, p.height, Person.weight, p.eat, Person.say);
