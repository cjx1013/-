import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  
  // 创建patch函数
  const patch = init([
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
  ]);

  // 创建旧的虚拟节点
  const myVnode1 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
  ])

   // 让虚拟节点上树
   const container = document.getElementById("container");
 
   patch(container, myVnode1)

  // 创建新的虚拟节点
  const myVnode2 = h('ul', {}, [
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
  ])
 
  // 调用patch，进行diff算法
  patch(myVnode1, myVnode2)