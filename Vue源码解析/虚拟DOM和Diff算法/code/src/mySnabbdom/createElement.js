// 真正创建节点，将vnode创建为DOM
export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    // 有子节点还是文本
    if(vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        // 有文本
        domNode.innerText = vnode.text
    }else if(vnode.children.length > 0 && Array.isArray(vnode.children)) {
        // 有子节点
        // 递归生成子节点的DOM
        for(let i = 0; i < vnode.children.length; i++) {
            let ch = createElement(vnode.children[i])
            // 插入子节点到vnode中
            domNode.appendChild(ch)
        }
    }
    // 补充vnode的elm属性
    vnode.elm = domNode
    // 返回生成的真正DOM
    return domNode
}