import { def } from './util';

// 得到Array.prototype
const arrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象，也就是说
// arrayMethods的原型时Array.prototype
export const arrayMethods = Object.create(arrayPrototype)

// 要改写的7个数组方法
const methodsNeekChange = [
    'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
]

methodsNeekChange.forEach(methodName => {
    // 备份原来的方法
    const original = arrayPrototype[methodName]

    // 对七个方法进行改写并放到arrayMethods对象身上
    def(arrayMethods, methodName, function() {
        // 调用原来的方法，但是谁调用得改变，参数就是给我们改写过的
        // push等方法传递的参数，如a.push(1)，this就是a
        // methodName就是push，它是一个函数，1就是arguments
        const result = original.apply(this, arguments)
        // 将arguments伪数组转为数组，因为后面要调用数组的slice方法
        const args = [...arguments]

        // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组
        // 肯定不是最高层，比如obj.g属性是数组，oboj不能是数组，第一次遍历obj这个对象的第一层属性
        // 的时候，已经给g属性(就是这个数组)添加了__ob__属性
        const ob = this.__ob__

        // 对三种方法(push,unshift,splice)特殊处理，因为它们能插入新项，新项也要进行响应式处理
        let inserted = []

        switch(methodName) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                // splice(下标，数量，插入的新项)
                // slice(2)，就是获得插入的新项
                inserted = args.slice(2)
                break
        }

        if(inserted) {
            // 对插入的新项也进行响应式处理
            ob.observeArray(inserted)
        }

        ob.dep.notify()

        return result
    }, false)
})