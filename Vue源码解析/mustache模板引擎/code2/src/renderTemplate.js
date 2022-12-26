// 将tokens和数据结合，生成DOM字符串

import lookup from "./lookup"
import parseArray from "./parseArray"

export default function renderTemplate(tokens, data) {
    // 结果字符串
    let resultStr = ''
    // 遍历tokens数组
    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i]

        if(token[0] == 'text') {
            // 如果是text，直接拼接到结果字符串
            resultStr += token[1]
        }else if(token[0] == 'name') {
            // 如果是name，用数据替换
            resultStr += lookup(data, token[1])
        }else if(token[0] == '#') {
            // 如果是#，则表示要循环，这里可以进行递归处理
            resultStr += parseArray(data, token)
        }
    }
    return resultStr
}