const path = require('path');

//注意如果参数里有../那么它会抵消掉前面的一层路径
const newPath = path.join('/a', '/b/c', '../', './d', 'e');
console.log(newPath);//输出\a\b\d\e