// 整理零散的tokens，将#和/之间的tokens整合起来，作为下标为2的项

export default function nestTokens(tokens) {
    // 结果数组
    let nestTokens = []

    // 栈，其实就是用来记录当前处理到哪个循环了，栈中的表示正在处理，弹栈的表示处理完了的循环
    // 比如两层循环
    /*
        {{#arr}}
            ……
            {{#arr2}}
            {{/arr2}}
            ……
        {{/arr}}，目标是收集成为
        [#, arr, [
            [……],
            [#, arr2, [……]]
            [……]
        ]]
        那么栈中就是栈顶是#arr2这个token，下面是#arr这个token，此时收集器会收集#arr2这个token
        的下标为2的项，当遇到{{/arr2}}，表示#arr2的循环处理完了，那么就弹出#arr2，栈顶此时为#arr
        收集器就会去收集栈顶#arr这个token了
    */
    let sections = []

    // 收集器
    let collector = nestTokens

    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i]

        switch(token[0]) {
            case '#':
                collector.push(token)
                // 压栈，遇到循环，#，就将这个token压入栈中，
                sections.push(token)
                // 同时收集器变成收集循环里的token作为下标为2的项
                collector = token[2] = []
                break
            case '/':
                // 遇到/，表示这一层的循环处理完了，弹栈
                sections.pop()
                // 判断弹栈后，栈中还有没有正在处理的循环，有就让收集器收集这个循环的token的下标
                // 为2的数组，栈中没有处理的循环，收集器就是又变回收集整个大token了
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
                break
            default:
                // 不是循环，就是普通的token，直接收集器收集
                collector.push(token)

        }
    }

    return nestTokens
}

