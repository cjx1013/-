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

  // 创建虚拟节点
  const myVnode = h('a', {props: {href: 'http://www.baidu.com'}, target: '_blank'}, '百度一下')
  const myVnode1 = h('ul', {}, [
    h('li', {}, h('p', {}, '菠萝')),
    h('li', {}, '香蕉'),
    h('li', {}, [h('div', '666'), h('div', '777')]),
  ])
  
  // 让虚拟节点上树
  const container = document.getElementById("container");
 
  patch(container, myVnode1)