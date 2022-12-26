/**
 * 功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
 * 比如，dataObj是
 * {
        a: {
            b: {
                c: 100
            }
        }
    }
    那么lookup(dataObj, 'a.b.c')结果就是100
 * 
 */
export default function lookup(dataObj, keyName) {

    if(keyName.indexOf('.') != -1 && keyName != '.') {
        // 如果是a.b.c这种格式
        const keys = keyName.split('.')
        let temp = dataObj
        for(let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]]            
        }
        return temp
    }
    // 如果没有点.
    return dataObj[keyName]
}
