class Person{
    name: string = 'ccc'
    static age: number = 11
    // readonly，只读
    readonly height: number = 180
    static readonly weight: number = 150

    eat() {
        console.log('eat');
        
    }
    static say(){
        console.log('say');
        
    }
}

const p = new Person()
console.log(p.name, Person.age, p.height, Person.weight, p.eat, Person.say);
