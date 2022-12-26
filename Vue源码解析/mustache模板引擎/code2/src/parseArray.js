import lookup from "./lookup"
import renderTemplate from "./renderTemplate";

export default function parseArray(data, token) {
    // console.log(data, token);

    // 获取数据中对应内容，v是个数组，里面存放着循环用到的数据
    const v = lookup(data, token[1])
    // console.log(v);
    
    // 结果字符串
    let resultStr = ''

    for(let i = 0; i < v.length; i++) {
        // 比如有两条对象数据，那么就要循环生成两条li
        resultStr += renderTemplate(token[2], {
            ...v[i],
            // 模板字符串中可能出现.  这表示是简单的数组，数组每项就是v[i]本身，所以给每个对象
            // 身上设置 . 属性，为了能够在renderTemplate中的能通过obj['.']的方式读取到值
            
            '.': v[i]
        })
    }
    
    return resultStr
}