// 这个vnode是个函数，其作用非常简单，就是将传入的5个参数组合成对象返回
export default function(sel, data, children, text, elm) {
    return {sel, data, children, text, elm}
}