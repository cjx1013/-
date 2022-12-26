import createElement from "./createElement"
import patchVnode from "./patchVnode"

function checkSameVnode(a, b) {
    // 判断两个vnode是否是相等的
    return a.sel == b.sel && a.data.key == b.data.key
}

export default function(parentElm, oldCh, newCh) {
    // 旧前
    let oldStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新前
    let newStartIdx = 0
    // 新后
    let newEndIdx = newCh.length - 1

    // 旧前指向的节点
    let oldStartVnode = oldCh[0]
    // 旧后指向的节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新前指向的节点
    let newStartVnode = newCh[0]
    // 新后指向的节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 首先得略过undefined的节点，因为在后面处理过的节点会被标记为undefined
        if(oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        }else if(oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if(newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx]
        }else if(newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx]
        }else if(checkSameVnode(newStartVnode, oldStartVnode)) {
            // 新前与旧前命中
            console.log('新前与旧前命中');
            // 更新(如果需要更新的话)
            patchVnode(oldStartVnode, newStartVnode)
            // 新前旧前指针下移
            newStartVnode = newCh[++newStartIdx]
            oldStartVnode = oldCh[++oldStartIdx]
        }else if(checkSameVnode(newEndVnode, oldEndVnode)) {
            // 新后与旧后命中
            console.log('新后与旧后命中');
            // 更新(如果需要更新的话)
            patchVnode(oldEndVnode, newEndVnode)
            // 新后旧后指针上移
            newEndVnode = newCh[--newEndIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        }else if(checkSameVnode(newEndVnode, oldStartVnode)) {
            // 新后与旧前命中
            console.log('新后与旧前命中');
            // 更新(如果需要更新的话)
            patchVnode(oldStartVnode, newEndVnode)
            // 并且要移动新后指向的节点到老节点旧后后面，插入一个已有的元素就是移动
            // 新后与旧前是对应的一对节点
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            // 新后指针上移，旧前指针下移
            newEndVnode = newCh[--newEndIdx]
            oldStartVnode = oldCh[++oldStartIdx]
            
        }else if(checkSameVnode(newStartVnode, oldEndVnode)) {
            // 新前与旧后命中
            console.log('新后与旧后命中');
            // 更新(如果需要更新的话)
            patchVnode(oldEndVnode, newStartVnode)
            // 并且要移动新前指向的节点到老节点旧前前面，插入一个已有的元素就是移动
            // 新前与旧后是对应的一对节点
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            // 新前指针下移，旧后指针上移
            newStartVnode = newCh[++newStartIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        }else{
            // 四种命中都没命中，则从新前指针newStartIdx项开始遍历寻找命中
            console.log('四种命中都没命中');
            if(!keyMap) {
                keyMap = {}
                // keyMap记录每个旧的节点的位置序号，这样就不用每次都遍历旧节点，
                // 看看旧节点有没有newStartIdx这一项了，
                for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].data.key
                    if(key != undefined) {
                        keyMap[key] = i 
                        /*如，则keyMap[A] = 1, keyMap[B] = 1, keyMap[C] = 2
                        h('li', {key: 'A'}, 'A'),
                        h('li', {key: 'B'}, 'B'),
                        h('li', {key: 'C'}, 'C'),
                        */
                    }
                }
            }
            // console.log(keyMap);
            // 四种命中都没命中，则寻找新前指针newStartIdx项在keyMap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.data.key]
            // console.log(idxInOld);
            if(idxInOld == undefined) {
                // 如果是undefined，表明在旧节点中没有该项，是全新的项，需要新增
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            }else {
                // 否则不是全新的项，而四种命中都没命中，说明位置变了，要移动
                const elmToMove = oldCh[idxInOld]
                // 这个项内部有更新则更新
                patchVnode(elmToMove, newStartVnode)
                // 把这项设置为undefined，表示我已经处理完这项了
                oldCh[idxInOld] = undefined
                // 移动，这项变化后的位置在newStartIdx，所以移动后的位置在对应的oldStartIdx
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)

            }
            // 新前指针下移
            newStartVnode = newCh[++newStartIdx]
        }
    }

    // 循环结束后
    if(newStartIdx <= newEndIdx) {
        // 如果新节点有未处理的，说明是需要新增的，插入DOM中的
        console.log('new 还有剩余节点未处理');
        for(let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore能自动识别null，如果是null就会自动排到队尾去
            // 插入到旧的未处理的之前，而不是已处理之后
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
        }
    }else if(oldStartIdx <= oldEndIdx) {
        // 如果旧节点有未处理的，说明是需要删除的
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            if(oldCh[i]){
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}