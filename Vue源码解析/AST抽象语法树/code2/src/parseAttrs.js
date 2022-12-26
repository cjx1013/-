export default function parseAttrs(attrs) {
    // 将class="d" id="did"这种标签上的属性变为[{name: class, value: d},{name: id, value: did}]
    // console.log(attrs);

    if(attrs == undefined) return []

    // 空格在引号内的标志
    let inYinhao = false

    // 结果数组
    let result = []

    // 切除的起点
    let cutStart = 0
    // 切除的终点
    let cutIndex = 0

    // 按照引号外的空格来切
    for(let i = 0; i < attrs.length; i++) {
        if(attrs[i] == '"') {
            inYinhao = !inYinhao
        }
        if(attrs[i] == ' ' && !inYinhao) {
            cutStart = cutIndex
            cutIndex = i
            if(attrs.substring(cutStart, cutIndex).trim() != '')
            result.push(attrs.substring(cutStart, cutIndex).trim());
        }
    }

    // 上面的循环会漏掉最后一个属性，在这里处理
    result.push(attrs.substring(cutIndex).trim())

    
    // 将[class="d", id="did"]变为[{name: class, value: d},{name: id, value: did}]
    result = result.map(item => {
        return {
            'name': item.match(/^(.+)="(.+)"$/)[1],
            'value': item.match(/^(.+)="(.+)"$/)[2]
        }
    })
    // console.log(result);

    return result
}