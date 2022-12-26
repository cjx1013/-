import patch from './mySnabbdom/patch';
import h from './mySnabbdom/h';
// 创建旧的虚拟节点
// const myVnode1 = h('section', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'B'),
//   h('li', {}, [
//     h('ol', {}, [
//       h('li', {}, '哈哈'),
//       h('li', {}, '嘿嘿'),
//     ])
//   ])
// ])
const myVnode1 = h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
])

const btn = document.getElementById('btn')
// 让虚拟节点上树
const container = document.getElementById("container");

patch(container, myVnode1)

// 创建新的虚拟节点
const myVnode2 = h('section', {}, [
  h('li', {key: 'Q'}, 'Q'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C')
])

btn.addEventListener('click', function() {
  patch(myVnode1, myVnode2)
})


