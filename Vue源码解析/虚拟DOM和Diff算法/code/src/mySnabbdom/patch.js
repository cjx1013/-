import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

// 实现patch函数
export default function(oldVnode, newVnode) {
    // 判断传入的第一个参数是否是DOM节点，如果是，则需包装成虚拟DOM
    // 就比如第一次上树的patch(container, myVnode1)，container就是真实DOM
    // 需要包装成虚拟DOM，因为Diff算法就是针对虚拟DOM的
    // 通过判断是否有sel这个属性来判断是否是虚拟DOM还是真实DOM
    // 虚拟DOM有sel，真实DOM没有
    if(oldVnode.sel == '' || oldVnode.sel == undefined) {
        // 是真实DOM，包装成虚拟DOM
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // 是虚拟DOM
    // 判断是否是同一节点，通过key和选择器sel来判断
    if(oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
        console.log('是同一节点，精细化比较');
        patchVnode(oldVnode, newVnode)
    }else {
        // 不是同一节点，直接暴力删除旧的，插入新的
        // 根据新的虚拟节点newVnode生成真实DOM
        let newNodeDom = createElement(newVnode)
        // 插入
        if(oldVnode.elm.parentNode && newNodeDom) {
            oldVnode.elm.parentNode.insertBefore(newNodeDom, oldVnode.elm)
        }
        // 删除旧的
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

}