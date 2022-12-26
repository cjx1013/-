(function () {
    class Person{
        // public修饰的属性可以在任意位置访问到，而且它是默认值
        // private修饰的属性只能在本类中访问到，外界访问不到，即使是继承也不行
        // protected修饰的属性可以在父类和子类中访问到，外界访问不到
        public name: string
        age: number
        private _gender: string
        protected height: string

        constructor(name: string, age: number, gender: string, height: string){
            this.name = name
            this.age = age,
            this._gender = gender,
            this.height = height
        }

        // 属性的存取器
        // getGender() {
        //     return this.gender
        // }
        // setGender(gender: string) {
        //     this.gender =  gender
        // }

        get gender() {
            return this._gender
        }

        set gender(gender: string) {
            this.gender = gender
        }

    }

    // 上面等价于下面
    class P{
        constructor(public name: string, public age: number,private _gender: string, protected height: string){
        }
        get gender() {
            return this._gender
        }

        set gender(gender: string) {
            this.gender = gender
        }
    }
    const p = new P('dd', 12, 'male', '133')

})()