import createElement from './createElement';
import updateChildren from './updateChildren'

// 处理最复杂的精细化比较
export default function(oldVnode, newVnode) {
    // 判断新旧vnode是否是同一对象，是就什么都不做
    if(oldVnode === newVnode) return
    // 判断新vnode是否有text属性
    if(newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        // 如果有，直接覆盖，即使旧节点有孩子也会被覆盖
        if(newVnode.text != oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text
        }
    }else {
        // 如果没有，则说明newVnode有children
        // 判断旧节点是否有children
        if(oldVnode.children != undefined && oldVnode.children.length > 0) {
            // 如果有，即oldVnode和newVnode都有children
            console.log('oldVnode和newVnode都有children');
            // 使用diff算法
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        }else {
            // 如果没有，说明oldVnode有text
            // 清空text，遍历新节点的孩子，创建DOM，上树
            oldVnode.elm.innerHTML = ''
            for(let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}