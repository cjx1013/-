import Dep from "./Dep";
import  observe  from "./observe";

// 为了避免生成临时变量，通常将defineProperties封装成一个函数
export default function defineReactive(data, key, val) {
    const dep = new Dep()
    console.log('我是defineReactive', key);
    // 如果不传第三个参数val
    if (arguments.length == 2) {
        // 那么让val等于对象本身的值
        val = data[key]
    }

    //val就是data的孩子属性，val有可能也是个对象，同样调用observe方法，由此，递归形成
    // 递归：observe -> new Observer -> defineReactive(defineReactive里又对observe有调用)
    // 所以形成一个循环，实现递归的效果
    let childOb = observe(val)

    Object.defineProperty(data, key, {
        // configurable，可以被配置，例如可以被delete
        configurable: true,
        // enumerable，可以被枚举
        enumerable: true,
        // getter
        get() {
            console.log('访问' + key);
            // 如果正在处理依赖收集阶段，读取数据，则收集依赖，依赖里存的是watcher实例
            if(Dep.target) {
                dep.depend()
                if(childOb) {
                    childOb.dep.depend()
                }
            }
            return val
        },
        // setter
        set(newVal) {
            if (newVal === val) return
            val = newVal
            console.log('修改' + key);
            // 对设置的新值也调用observe
            childOb = observe(newVal)
            // 发布订阅模式，通知dep,修改数据，通知依赖
            dep.notify()
        }
    })
}