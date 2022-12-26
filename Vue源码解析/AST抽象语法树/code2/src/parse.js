import parseAttrs from "./parseAttrs"

export default function parse(templateStr) {

    // 指针
    let index = 0
    // 栈1
    let stack1 = []
    // 栈2，vue源码是只用了一个栈
    let stack2 = [{'children': []}]
    // 剩余部分，尾巴
    let tail = templateStr
    
    // 开始标记的正则
    let startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
    // 结束标记的正则
    let endReg = /^\<\/([a-z]+[1-6]?)\>/
    // 结束标记之前的除了以<开头以外的文本内容的正则
    // 为什么要除了以<开头以外呢，因为要
    // 防止比如<div>666</div>，收集文本时会把<div>也收集进去
    let wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/

    while(index < templateStr.length - 1) {
        tail = templateStr.substring(index)
        if(startReg.test(tail)) {
            // 识别开始标记
            // 得到开始标记中的内容以及属性，如<div class="dd">则获取div，和class="dd"
            let tag = tail.match(startReg)[1]
            let attrs = tail.match(startReg)[2]
            // 指针后移的长度为开始标记的长度，加2是<>这两个字符，再加上属性的长度
            const attrsLength = attrs == null ? 0 : attrs.length
            index += tag.length + 2 + attrsLength
            // 将开始标记压入栈1，将一个准备对象压入栈2
            stack1.push(tag)
            stack2.push({'tag': tag, 'children': [], 'attrs': parseAttrs(attrs)})
            // console.log('监测到开始标记', tag, attrs);
        }else if(endReg.test(tail)){
            // 识别结束标记
            // 得到结束标记中的内容，如</div>则获取div
            let tag = tail.match(endReg)[1]
            // 栈2顶部的结束标记与栈1顶部的开始标记的内容一定是相等的
            if(tag == stack1[stack1.length - 1]) {
                let pop_tag = stack1.pop()
                // 遇到结束标记，栈1弹栈，栈2也弹栈
                let pop_arr = stack2.pop()
                // 弹栈后，看现在的栈2顶部元素身上是否有children属性，有就将栈2刚刚
                if(stack2.length > 0) {
                    // 如果栈2有顶部元素
                    // 弹出的内容赋值给栈2顶部元素的children属性
                    stack2[stack2.length - 1].children.push(pop_arr)
                }
            }else {
                // 不相等，说明用户输入的有错误
                throw new Error(stack1[stack1.length - 1] + '标签没有封闭!')
            }
            // 指针后移结束标记的长度，加3是</>这三个字符
            index += tag.length + 3
            // console.log('监测到结束标记', tag);
            // console.log(stack1, stack2);
        }else if(wordReg.test(tail)){
            // 识别开始标记和结束标记之间的文本内容
            // 得到文字
            let word = tail.match(wordReg)[1]
            // 如果文字全是空格，则不要
            if(!/^\s+$/.test(word)) {
                // console.log('检测到文字', word);
                // 将文字改变格式，推入到stack2栈顶的准备对象的children属性中
                stack2[stack2.length - 1].children.push({'text': word, 'type': 3})
            }
            index += word.length
            // console.log(stack1, stack2);
        }else {
            index++
        }

    }
    // console.log(stack2);
    // while结束后，stack2中存放的一项的children属性值就是生成的ast树
    return stack2[0].children[0]
    
}