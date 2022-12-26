import h from './mySnabbdom/h'

// const myVnode = h('ul', {}, [
//     h('li', {}, h('p', {}, '菠萝')),
//     h('li', {}, '香蕉'),
//     h('li', {}, [h('div', '666'), h('div', '777')]),
// ])
const myVnode = h('div', {}, [h('div', {}, []), h('div', {}, 5888)])
console.log(myVnode);