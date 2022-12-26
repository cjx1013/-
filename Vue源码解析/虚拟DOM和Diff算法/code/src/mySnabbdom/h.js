import vnode from './vnode'

// 这里实现低配版的h函数，只能传3个参数
// 形态1: h('div', {}, '我是文本')
// 形态2: h('div', {}, [])
// 形态3: h('div', {}, h())

export default function (sel, data, c) {
    // 检查参数个数是否是3个
    if(arguments.length != 3) {
        throw new Error('这是个低配版h函数,只能传3个参数')
    }
    // 检查参数c的类型
    if(typeof c == 'string' || typeof c == 'number') {
        // 说明是形态1
        return vnode(sel, data, undefined, c, undefined)
    }else if(Array.isArray(c)) {
        // 说明是形态2，c是数组，里面又是h函数的调用，h函数会返回一个对象
        // 将数组中的对象存储到children数组中
        let children = []
        for(let i = 0; i < c.length; i++) {
            if(!typeof c[i] == 'object' && c[i].hasOwnProperty('sel')) {
                throw new Error('传入的数组参数中有项不是h函数')
            }  
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
        // 说明是形态3，c就是一个h函数，直接存到children中
        let children = []
        children.push(c)
        return vnode(sel, data, children, undefined, undefined)
    }else {
        throw new Error('参数有问题')
    }
}


