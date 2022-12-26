import  observe  from "./observe.js";
import Watcher from './Watcher.js'


let obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10,
    g: [11, 23, 44]
}


observe(obj)
obj.a.m = 10
// 测试watcher
new Watcher(obj, 'a.m.n', (val) => {
    console.log('☆', val);
})

obj.b++
obj.g.push(77)