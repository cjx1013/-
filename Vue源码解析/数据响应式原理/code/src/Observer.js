import {def} from './util.js'
import defineReactive  from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe.js';
import Dep from './Dep.js';

export default class Observer{
    constructor(value) {
        // 每个Observer的实例中，都有一个Dep实例
        this.dep = new Dep()
        // 调用def方法，给传进来的value，加上__ob__属性，并赋值为当前Observer对象
        def(value, '__ob__', this, false)
        console.log('我是Observer构造器', value);
        // 检查是数组还是对象
        if(Array.isArray(value)){
            // value是数组，为了响应式，将它的原型指向为我们修改过的具有push方法的原型
            Object.setPrototypeOf(value, arrayMethods)
            // 对value数组进行遍历
            this.observeArray(value)
        }else{
            // 对value进行遍历，value是对象
            this.walk(value)
        }
    }

    // 遍历，将传进来的value的第一层属性变为响应式
    // 所以，总的来说Observer类的作用就是给没有__ob__属性的加上__ob__，
    // 值为Observe实例，而且会对传进来的value进行第一层属性的响应式实现
    // 它的目的就是将一个正常的object转换为每个层级的属性都是响应式的object
    walk(value) {
        for(let k in value) {
            // 其实不止第一层，defineReactive里又对value的孩子属性又进行了observe，
            // 因为没有给defineReactive传递第三个参数，所以孩子属性值就是
            // value[k]，孩子属性的本身值也就是value[k]
            defineReactive(value, k)
        }
    }
    // 数组的遍历
    observeArray(arr) {
        for(let i = 0; i < arr.length; i++) {
            // 将数组的第一层元素变为响应式
            observe(arr[i])
        }
    }
}