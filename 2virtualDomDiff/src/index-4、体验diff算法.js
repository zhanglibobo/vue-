import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  vnode,
} from "snabbdom";

// 创建patch函数
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const btn = document.getElementById("btn");
const container = document.getElementById("container");

const vnode1 = h('ul', {}, [
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C'),
])
const vnode2 = h('ul', {}, [
  h('li', {key:'D'}, 'D'),
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C'),
])
patch(container, vnode1);

// 点击按钮 将vnode1变为vnode2
btn.onclick = function () {
  patch(vnode1, vnode2);
}
/* 
  diff 算法 【图4】
  1、最小量更新，key很重要，key是这个节点的唯一标识，告诉diff算法，在更改前后他们是同一个dom节点
  2、只有是同一个虚拟节点，才进行精细化比较，否则就删除旧的，插入新的。
    （如何判断是同一个虚拟节点？选择器相同且 key 相同）
  3、只进行同层比较，不会进行跨层比较。即使是同一片虚拟节点，但是跨层了，精细化比较不进行diff,而是删除旧的，然后插入新的

  （ diff并不是无微不至的，真的会影响效率吗？）
  （ 上面的操作在实际vue开发中，基本不会遇见，所以是合理的优化机制 ）
*/
// 如何判断是否是同一个节点
// 旧节点和新节点的key相同  且 旧节点的选择器和新节点的选择器相同
function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}